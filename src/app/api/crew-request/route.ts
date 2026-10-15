import { NextResponse } from "next/server";

/**
 * Legacy captain/deck support requests moved to the vessel-review form
 * (`/contact?service=Crew%20support`). `/crew` is now the expense report flow.
 */
export async function POST() {
  return NextResponse.json(
    {
      error:
        "Crew support requests now use the contact form. Expense reports use /api/crew-expense.",
    },
    { status: 410 },
  );
}
