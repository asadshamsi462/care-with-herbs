import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const amount = Number(body.amount);

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 }
      );
    }

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
console.log("Razorpay Key Check:", {
  keyIdPresent: !!keyId,
  keyIdPrefix: keyId?.slice(0, 9),
  secretPresent: !!keySecret,
});
    if (!keyId || !keySecret) {
      return NextResponse.json(
        { error: "Razorpay keys are missing" },
        { status: 500 }
      );
    }

    const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");

    const razorpayResponse = await fetch(
      "https://api.razorpay.com/v1/orders",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${auth}`,
        },
        body: JSON.stringify({
          amount: Math.round(amount * 100),
          currency: "INR",
          receipt: `cwh_${Date.now()}`,
        }),
      }
    );

    const data = await razorpayResponse.json();

    if (!razorpayResponse.ok) {
      console.error("Razorpay Order Error:", data);

      return NextResponse.json(
        {
          error: data?.error?.description || "Failed to create Razorpay order",
        },
        { status: razorpayResponse.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Razorpay API Error:", error);
return NextResponse.json(
  {
    error: error instanceof Error ? error.message : String(error),
  },
  { status: 500 }
);
  }
}