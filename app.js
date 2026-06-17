document.documentElement.dataset.theme =
localStorage.getItem("theme") || "dark";

const themeToggle =
document.getElementById("theme-toggle");

const themeLabel =
document.getElementById("themeLabel");

function updateThemeLabel(){
themeLabel.textContent =
document.documentElement.dataset.theme === "dark"
? "Dark"
: "Light";
}

updateThemeLabel();

themeToggle.addEventListener("click",()=>{

const next =
document.documentElement.dataset.theme === "dark"
? "light"
: "dark";

document.documentElement.dataset.theme = next;

localStorage.setItem("theme",next);

updateThemeLabel();

});

let repository = {};

async function loadRepository(){

const res = await fetch("designs.json");

repository = await res.json();

renderFolders();

}

function renderFolders(){

const container =
document.getElementById("folders");

container.innerHTML = "";

const categories =
Object.keys(repository);

document.getElementById("totalCategories")
.textContent = categories.length;

let fileCount = 0;

categories.forEach(c=>{
fileCount += repository[c].length;
});

document.getElementById("totalFiles")
.textContent = fileCount;

categories.forEach(category=>{

const btn =
document.createElement("button");

btn.className =
"folder w-full text-left p-3 rounded-lg border border-transparent";

btn.innerHTML =
`<i class="fa-solid fa-folder brand mr-2"></i>${category}`;

btn.onclick = () => renderFiles(category,btn);

container.appendChild(btn);

});

}

function renderFiles(category,btn){

document.querySelectorAll(".folder")
.forEach(x=>x.classList.remove("active-folder"));

btn.classList.add("active-folder");

const files =
repository[category];

document.getElementById("path")
.textContent =
`designs/${category}`;

document.getElementById("count")
.textContent =
`${files.length} files`;

const container =
document.getElementById("files");

container.innerHTML = "";

files.forEach(file=>{

const row =
document.createElement("div");

row.className =
"file-item p-4 flex justify-between items-center";

row.innerHTML = `
<div>
<div class="font-medium">${file.name}</div>
<div class="text-xs text-slate-500">
${file.path}
</div>
</div>

<a
href="${file.path}"
target="_blank"
class="px-3 py-1 rounded-lg"
style="background:#33a69a;color:white;">
Open
</a>
`;

container.appendChild(row);

});

}

document.getElementById("search")
.addEventListener("input",(e)=>{

const q =
e.target.value.toLowerCase();

document.querySelectorAll(".file-item")
.forEach(item=>{

item.style.display =
item.innerText.toLowerCase().includes(q)
? ""
: "none";

});

});

loadRepository();