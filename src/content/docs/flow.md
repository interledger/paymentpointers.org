---
title: Flow
---

When a user wishes to make or receive a payment, and is engaging with a counter-party that is able to process Payment Pointers, it provides a Payment Pointer to the counter-party.

The counter-party's client then uses this Payment Pointer as described below to discover the services and accounts linked to the Payment Pointer and interact with these to send or request a payment.

This is analogous to how a user may provide a credit card number to a merchant to make a payment online, or provide their bank account details to a payer to receive a payment. However, in the case of Payment Pointers the pointer and the services are loosely coupled so a variety of service types could be discovered and payments can be both pushed and pulled from the user's account initiated via the same Payment Pointer.

## Step 1: Resolve Open Payments Server Meta-Data URL

The first step the client performs is to decode the **Payment Pointer URL** from the Payment Pointer using the [rules](/syntax-resolution) defined in this specification.

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

## Step 2: Discover Open Payments Endpoints

The client then uses the HTTP protocol to query the resolved **Open Payments account** URL and [discover](https://docs.openpayments.dev/discovery) the Open Payments services endpoints.

The resolved endpoint MAY redirect the client to another URL but the client MUST ensure it affords the sender an opportunity to verify both the originally resolved and ultimate endpoint hosts.

### Example:

```http
GET /.well-known/pay HTTP/1.1
Host: alice.wallet.example
Accept: application/json
```

## Step 3: Initiate Payment

Having discovered the available endpoints, the client initiates the payment using one of the supported [Open Payments](https://openpayments.dev) protocols appropriate to the use case.

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
