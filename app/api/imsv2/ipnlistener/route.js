import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Every payment IPN hit gets appended here as-is so you can tail the file
// and confirm the callback actually arrived, with what payload, while testing.
const PAYMENT_LOG_FILE = path.join(process.cwd(), "file_txt_payment.txt");

export async function POST(request) {
  try {
    const rawBody = await request.text();

    let parsedBody = rawBody;
    try {
      parsedBody = JSON.parse(rawBody);
    } catch {
      // not JSON — keep the raw text as-is
    }

    const logEntry = {
      received_at: new Date().toISOString(),
      headers: Object.fromEntries(request.headers.entries()),
      body: parsedBody,
    };

    fs.appendFileSync(
      PAYMENT_LOG_FILE,
      JSON.stringify(logEntry) + "\n"
    );

    console.log("IPN LISTENER received payment:", logEntry);

    return NextResponse.json({
      ResultCode: 0,
      ResultDesc: "Accepted",
      status: "success",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        ResultCode: 1,
        ResultDesc: "Failed",
      },
      { status: 500 }
    );
  }
}
