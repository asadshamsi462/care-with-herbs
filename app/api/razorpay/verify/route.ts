import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,

      // Customer details
      customer_name,
      customer_phone,
      address,
      city,
      pincode,

      // Order details
      items,
      total_amount,
    } = body;

    // -----------------------------
    // 1. CHECK RAZORPAY DETAILS
    // -----------------------------

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Payment verification details are missing",
        },
        { status: 400 }
      );
    }

    // -----------------------------
    // 2. RAZORPAY SECRET
    // -----------------------------

    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keySecret) {
      console.error("RAZORPAY_KEY_SECRET is missing");

      return NextResponse.json(
        {
          success: false,
          error: "Razorpay secret key is missing",
        },
        { status: 500 }
      );
    }

    // -----------------------------
    // 3. VERIFY SIGNATURE
    // -----------------------------

    const bodyToVerify =
      `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(bodyToVerify)
      .digest("hex");

    const isValid =
      expectedSignature.length === razorpay_signature.length &&
      crypto.timingSafeEqual(
        Buffer.from(expectedSignature),
        Buffer.from(razorpay_signature)
      );

    if (!isValid) {
      console.error("Razorpay signature verification failed");

      return NextResponse.json(
        {
          success: false,
          error: "Invalid payment signature",
        },
        { status: 400 }
      );
    }

    console.log("Razorpay payment verified:", {
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });

    // -----------------------------
    // 4. SAVE ORDER TO SUPABASE
    // -----------------------------

    const { data: savedOrder, error: supabaseError } =
      await supabaseAdmin
        .from("orders")
        .insert({
          customer_name: customer_name || "",
          customer_phone: customer_phone || "",
          address: address || "",
          city: city || "",
          pincode: pincode || "",
          total_amount: Number(total_amount) || 0,
          payment_status: "paid",
          razorpay_order_id,
          razorpay_payment_id,
          items: items || [],
        })
        .select()
        .single();

    if (supabaseError) {
      console.error(
        "Supabase Order Insert Error:",
        supabaseError
      );

      return NextResponse.json(
        {
          success: false,
          error: "Payment verified but order could not be saved",
        },
        { status: 500 }
      );
    }

    console.log("Order saved to Supabase:", savedOrder.id);

    // -----------------------------
    // 5. FINAL RESPONSE
    // -----------------------------

    return NextResponse.json({
      success: true,
      message: "Payment verified and order saved successfully",
      order: savedOrder,
      razorpay_order_id,
      razorpay_payment_id,
    });

  } catch (error) {
    console.error("Razorpay Verification Error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Payment verification failed",
      },
      { status: 500 }
    );
  }
}