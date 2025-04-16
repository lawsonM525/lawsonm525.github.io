// Toggle visibility of accordion panel
function toggleFunction() {
    this.classList.toggle("active");
    const panel = this.nextElementSibling;
    panel.style.display = panel.style.display === "block" ? "none" : "block";
}

// Create a single accordion section with a download link
function createAccordionSection(number) {
    // Create button element
    const button = document.createElement("button");
    button.className = "accordion";
    button.textContent = `Section ${number}`;
    button.addEventListener("click", toggleFunction);

    // Create panel element
    const panel = document.createElement("div");
    panel.className = "panel";

    // Create download link
    const link = document.createElement("a");
    link.href = `../images/img${number}.jpg`;
    link.download = "";
    link.textContent = `Download image ${number}`;

    // Assemble panel
    panel.appendChild(document.createElement("p")).appendChild(link);

    return [button, panel];
}

// Create all accordion sections based on NRIMAGES
function initializeAccordion() {
    const container = document.getElementById("accordionContainer");
    for (let i = 1; i <= NRIMAGES; i++) {
        const [button, panel] = createAccordionSection(i);
        container.appendChild(button);
        container.appendChild(panel);
    }
}
