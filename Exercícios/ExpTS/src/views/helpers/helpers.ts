export function filterByNodeList(technologies: { name: string, type: string, poweredByNodejs: boolean }[]) {
    const filtered = technologies.filter(tech => tech.poweredByNodejs);
    const list = filtered.map(tech => `<li>${tech.name} - ${tech.type}</li>`).join('');
    return `<ul>${list}</ul>`;
}
