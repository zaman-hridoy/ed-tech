import { NextResponse } from "next/server";
import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request, res: Response) {
  try {
    const { amount, currency } = await req.json();
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { message: "Amount is not provided." },
        { status: 400 }
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: +amount * 100,
      currency: currency || "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    console.log("CREATE_PAYMENT_INTENT", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
