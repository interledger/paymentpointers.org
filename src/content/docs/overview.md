---
title: Overview
---

Payment pointers are unique, recognizable, and standardized identifiers for payment accounts.

Other standardized identifiers, such as email addresses and social media handles, are widely used across the Internet and provide a simple and straightforward way to exchange information with others. The intent behind payment pointers is no different.

Payment pointers begin with a `$` to distinguish them from other types of identifiers. For example, `$wallet.example.com/alice`. Every payment pointer also has a corresponding HTTPS URL.

**Although originally developed for Interledger, payment pointers are not tightly coupled with the protocol.** Any payment setup protocol is welcome to leverage payment pointers without integrating with Interledger. Interledger is just one [active implementation](/examples/ilp-implementation) of payment pointers.

## Get your payment pointer's URL

If you already have a payment pointer and need to convert it to its corresponding HTTPS URL, enter it in the field below.

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
    throw new Error("URL must be a valid URL string or URL object");
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

## Brief history

Payment pointers were developed alongside the <a href="https://interledger.org/developers/get-started/" target="_blank">Interledger Protocol</a> stack as a way to express URL endpoints in a user-friendly way. 

Interledger's Simple Payment Setup Protocol (SPSP) exchanges the connection details needed to set up an Interledger payment. An SPSP server exposes an HTTPS endpoint that a client can query to get those details. For example, `https://alice.wallet.example/.well-known/pay`.

Endpoints like that can become unwieldy and hard to remember. Instead of entering the endpoint into a client or sharing the address with a counter-party, the URL can instead be expressed in shorthand form as a payment pointer: `$alice.wallet.example`.

For more information on how Interledger uses payment pointers, see its [implementation example](/examples/ilp-implementation) page.

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
