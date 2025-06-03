---
title: How it works
---

A payment service endpoint provides the information that's necessary for interacting with a payment pointer's underlying payment account. Payment service endpoints **MUST** accept HTTP GET requests and be identifiable by an HTTPS URI as defined in <a href="https://datatracker.ietf.org/doc/html/rfc7230" target="_blank">RFC7230</a>.

:::note
In addition to payment service endpoint requirements, you should familiarize yourself with the [syntax and resolution](/syntax) requirements of payment pointers.
:::

Payment pointers aren't meant to be tightly coupled to any specific payment service. Individuals and small companies can host their own payment service endpoints at URLs that resolve to payment pointers.

Likewise, payment service providers can host payment service endpoints for multiple entities without the risk of hosting them at endpoint URLs that conflict with their other services. To that end, providers have the option of hosting different endpoints under the same domain and a different path, or at a different sub-domain for each of their users.

## Step 1: Resolve server meta-data URL

Let's say you are using a payment app to send a payment to a friend. You enter your friend's payment pointer into the app.

The first step a client (for example, your payment app) must perform is to decode the endpoint URL from the payment pointer using the [rules](/syntax#resolution) defined in this specification.

<div class="pp-converter not-content">
  <div class="input-wrapper">
    <label class="payment-pointer">
      <p>Payment Pointer</p>
      <input id="pp-input" value="$alice.wallet.example" placeholder="$alice.wallet.example" />
    </label>
    <label class="url">
      <p>URL</p>
      <input id="url-input" value="https://alice.wallet.example/.well-known/pay" readonly />
    </label>
  </div>
  <p id="error" class="error-msg"></p>
</div>

## Step 2: Discover endpoints

The client then uses the HTTP protocol to query (`GET`) the resolved endpoint URL. The client uses the `Accept` header to express the media types of the protocol messages it supports.

```http title="Example"
GET /.well-known/pay HTTP/1.1
Host: alice.wallet.example
Accept: application/json
```

The response contains details the client needs to discover the payment service endpoints for interacting with the underlying account.

The resolved endpoint **MAY** redirect the client to another URL but the client **MUST** ensure it affords the sender an opportunity to verify both the originally resolved and ultimate endpoint hosts.

## Step 3: Initiate payment

Having discovered the available endpoint, the client initiates the payment using the payment setup protocol appropriate to the use case.

<script>
  function resolveUrl(pointer) {
    if (typeof pointer !== "string") {
      throw new Error("Payment pointer must be a string");
    }
    if (pointer.charAt(0) !== "$") {
      throw new Error('Payment pointer must start with "$"');
    }
    const url = new URL("https://" + pointer.slice(1));
    if (url.port) {
      throw new Error("Payment pointers cannot be defined with a port");
    }
    if (url.username || url.password) {
      throw new Error("Payment pointers cannot be defined with userinfo");
    }
    if (url.search) {
      throw new Error("Payment pointers cannot be defined with query parameters");
    }
    if (url.hash) {
      throw new Error("Payment pointers cannot be defined with a fragment");
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
          'Payment pointers can only point to URLs with a protocol of "https"'
        );
      }
      if (u.port) {
        throw new Error(
          "Payment pointers cannot point to URLs with a custom port"
        );
      }
      if (u.username || u.password) {
        throw new Error(
          "Payment pointers cannot point to URLs containing `userinfo`"
        );
      }
      if (u.search) {
        throw new Error(
          "Payment pointers cannot point to URLs with query parameters"
        );
      }
      if (u.hash) {
        throw new Error("Payment pointers cannot point to URLs with a fragment");
      }
      const path = u.pathname.endsWith("/")
        ? u.pathname.slice(0, -1)
        : u.pathname;
      if (path === "") {
        throw new Error(
          "Payment pointers cannot point to URLs with an empty path"
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
  .pp-converter .error-msg.error-msg {
    margin-top: var(--space-3xs);
    color: firebrick;
    font-size: var(--step--1);
  }
</style>
