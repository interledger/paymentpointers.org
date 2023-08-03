---
title: Payment Pointers
---

## Explainer

**Payment Pointers** are a standardized identifier for payment accounts. In the same way that an email address provides an identifier for a mailbox in the email ecosystem a payment pointer is used by an account holder to share the details of their account with a counter-party.

A Payment Pointer resolves to a URL (with the https scheme) that can be used to discover the [Open Payments](https://openpayments.dev) endpoints for interacting with the account. Using the [Open Payments](https://openpayments.dev) protocol the counter-party can initiate a payment to or from the owner of the Payment Pointer.

<div class="pp-converter">
  <div class="input-wrapper">
    <label class="payment-pointer">
      <p>Payment Pointer</p>
      <input id="pp-input" value="$alice.wallet.example" />
    </label>
    <label class="url">
      <p>URL</p>
      <input id="url-input" value="https://alice.wallet.example/.well-known/pay" />
    </label>
  </div>
  <p id="error" class="error-msg"></p>
</div>

### Syntax

Payment Pointers start with a `$` character to distinguish them from other identifiers and make it obvious that they are related to payments. To convert a Payment Pointer to a URL the `$` is replaced with the standard prefix of a secure URL, `https://`.

Payment Pointers don't contain query strings or fragments, however [Open Payments](https://openpayments.dev) MAY define standard parameters that can be used by a client when connecting to an [Open Payments](https://openpayments.dev) service endpoint.

[More details...](/syntax)

### Flow

When making or a receiving a payment, a user passes a Payment Pointer to the counter-party who decodes it to the corresponding URL.

That URL represents an account at a wallet and the client begins an interaction with the wallet using the [Open Payments](https://docs.openpayments.dev) protocol.

[More details...](/flow)

<script>
  function resolveUrl(pointer) {
    if (typeof pointer !== "string") {
      throw new Error("Payment Pointer must be a string");
    }
    if (pointer.charAt(0) !== "$") {
      throw new Error('Payment Pointer must start with "$"');
    }
    const url = new URL("https://" + pointer.slice(1));
    if (url.port) {
      throw new Error("Payment Pointers cannot be defined with a port");
    }
    if (url.username || url.password) {
      throw new Error("Payment Pointers cannot be defined with userinfo");
    }
    if (url.search) {
      throw new Error("Payment Pointers cannot be defined with query parameters");
    }
    if (url.hash) {
      throw new Error("Payment Pointers cannot be defined with a fragment");
    }
    if (url.pathname === "" || url.pathname === "/") {
      url.pathname = "/.well-known/pay";
    }
    return url.href;
  }

  function createPaymentPointer(url) {
    const u = typeof url === "string" ? new URL(url) : url;
    if (u instanceof URL) {
      if (u.protocol !== "https:") {
        throw new Error(
          'Payment Pointers can only point to URLs with a protocol of "https"'
        );
      }
      if (u.port) {
        throw new Error(
          "Payment Pointers cannot point to URLs with a custom port"
        );
      }
      if (u.username || u.password) {
        throw new Error(
          "Payment Pointers cannot point to URLs containing `userinfo`"
        );
      }
      if (u.search) {
        throw new Error(
          "Payment Pointers cannot point to URLs with query parameters"
        );
      }
      if (u.hash) {
        throw new Error("Payment Pointers cannot point to URLs with a fragment");
      }
      const path = u.pathname.endsWith("/")
        ? u.pathname.slice(0, -1)
        : u.pathname;
      if (path === "") {
        throw new Error(
          "Payment Pointers cannot point to URLs with an empty path"
        );
      }
      return "$" + u.hostname + (path === "/.well-known/pay" ? "" : path);
    }
    throw new Error("url must be a valid URL string or URL object");
  }

  function toggleError(msg) {
    const error = document.getElementById("error");
    if (msg) {
      error.innerHTML = msg;
    } else {
      error.innerHTML = "";
    }
  }

  document.getElementById("url-input").addEventListener("keyup", (event) => {
    const url = event.srcElement.value;
    try {
      if (url.length > 8) {
        const pp = createPaymentPointer(url);
        document.getElementById("pp-input").value = pp;
      }
      toggleError();
    } catch (e) {
      toggleError(e.message);
    }
  });

  document.getElementById("pp-input").addEventListener("keyup", (event) => {
    const pp = event.srcElement.value;
    try {
      if (pp.length > 3) {
        const url = resolveUrl(pp);
        document.getElementById("url-input").value = url;
      }
      toggleError();
    } catch (e) {
      toggleError(e.message);
    }
  });
</script>

<style>
  .input-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
  @media screen and (min-width: 550px) {
    .input-wrapper {
      flex-direction: row;
    }
  }
  label p {
    font-weight: 700;
  }
  input { width: 100% }
  .payment-pointer {
    flex: 1 1 0;
  }
  .url.url {
    flex: 2 1 0;
    margin-top: 0;
  }
  .error-msg.error-msg {
    margin-top: 0;
    color: maroon;
  }
</style>
