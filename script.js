const WHATSAPP_NUMBER = "5521994131849";
const flavorImages = {
  "Chocolate": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=80",
  "Branco": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=80",
  "Laranja": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=80",
  "Cenoura": "https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=700&q=80",
  "Milho": "https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=700&q=80",
  "Formigueiro": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=80",
  "Fubá": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=80"
};
let selectedFlavor = "Chocolate";
const money = value => value.toLocaleString("pt-BR", {style:"currency", currency:"BRL"});

function getOptions() {
  return {
    calda: document.querySelector('input[name="calda"]:checked').value,
    pagamento: document.querySelector('input[name="pagamento"]:checked').value
  };
}
function getPrice(calda, pagamento) {
  if (calda === "Sem calda") return pagamento === "Dinheiro" ? 13 : 15;
  return pagamento === "Dinheiro" ? 18 : 19;
}
function updateSummary() {
  const {calda, pagamento} = getOptions();
  document.getElementById("summary-flavor").textContent = `Bolo de ${selectedFlavor}`;
  document.getElementById("summary-calda").textContent = calda;
  document.getElementById("summary-payment").textContent = pagamento;
  document.getElementById("summary-price").textContent = money(getPrice(calda, pagamento));
  document.getElementById("summary-image").src = flavorImages[selectedFlavor];
  document.getElementById("summary-image").alt = `Bolo de ${selectedFlavor}`;
}
document.querySelectorAll(".flavor-card").forEach(card => {
  card.addEventListener("click", () => {
    document.querySelectorAll(".flavor-card").forEach(item => {
      item.classList.remove("selected");
      item.setAttribute("aria-pressed", "false");
      item.querySelector(".choose-label").textContent = "Escolher sabor";
    });
    card.classList.add("selected");
    card.setAttribute("aria-pressed", "true");
    card.querySelector(".choose-label").textContent = "Selecionado ✓";
    selectedFlavor = card.dataset.flavor;
    updateSummary();
  });
});
document.querySelectorAll('input[name="calda"], input[name="pagamento"]').forEach(input => {
  input.addEventListener("change", updateSummary);
});
document.getElementById("order-form").addEventListener("submit", event => {
  event.preventDefault();
  const nome = document.getElementById("nome").value.trim();
  const endereco = document.getElementById("endereco").value.trim();
  const observacoes = document.getElementById("observacoes").value.trim();
  const {calda, pagamento} = getOptions();
  const preco = getPrice(calda, pagamento);
  const lines = [
    "Olá! Quero fazer um pedido na ACLA Sabores Supremos 🍰",
    "",
    `*Sabor:* Bolo de ${selectedFlavor}`,
    `*Tamanho:* 18 cm`,
    `*Calda:* ${calda}`,
    `*Pagamento:* ${pagamento}`,
    `*Valor do bolo:* ${money(preco)}`,
    "*Entrega:* taxa a combinar",
    "",
    `*Nome:* ${nome}`,
    `*Endereço:* ${endereco}`,
    observacoes ? `*Observações:* ${observacoes}` : "",
    "",
    "Por favor, confirme a disponibilidade e o valor da entrega. Obrigado(a)!"
  ].filter(Boolean);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
  window.open(url, "_blank", "noopener,noreferrer");
});
document.getElementById("year").textContent = new Date().getFullYear();
updateSummary();