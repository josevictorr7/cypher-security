const encryptForm = document.querySelector(".form-encrypt");
const decryptForm = document.querySelector(".form-decrypt");
const inputMessageEncrypt = document.getElementById("iemessage");
const inputMessageDecrypt = document.getElementById("idmessage");
const inputKeyEncrypt = document.getElementById("iekey");
const inputKeyDecrypt = document.getElementById("idkey");

encryptForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const message = inputMessageEncrypt.value.trim();
  const key = inputKeyEncrypt.value.trim();

  if (!message || !key) {
    alert("⚠️ Digite a mensagem e a chave!");
    return;
  }

  try {
    const response = await fetch(
      "https://cypher-security.onrender.com/encrypt",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: message, key: key }),
      }
    );

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const data = await response.json();

    inputMessageDecrypt.value = data.token;
    inputKeyDecrypt.value = key;
  } catch (error) {
    console.error("Erro ao criptografar:", error);
    alert("❌ Falha ao criptografar. Verifique se o backend está rodando.");
  }
});

decryptForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const token = inputMessageDecrypt.value.trim();
  const key = inputKeyDecrypt.value.trim();

  if (!token || !key) {
    alert("⚠️ Digite o token e a chave!");
    return;
  }

  try {
    const response = await fetch(
      "https://cypher-security.onrender.com/decrypt",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: token, key: key }),
      }
    );

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const data = await response.json();

    inputMessageEncrypt.value = data.text;
  } catch (error) {
    console.error("Erro ao descriptografar:", error);
    alert("❌ Falha ao descriptografar. Verifique a chave ou o token.");
  }
});
