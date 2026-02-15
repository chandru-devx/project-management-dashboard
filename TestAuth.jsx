import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from "@clerk/clerk-react";

export default function TestAuth() {
  return (
    <div style={{ padding: 40 }}>
      <SignedOut>
        <SignInButton />
      </SignedOut>

      <SignedIn>
        <UserButton />
        <h2>You are logged in</h2>
      </SignedIn>
    </div>
  );
}
