---
maestru: "0.4"
type: doc
id: weatherapp-overview
title: WeatherApp — Visão Geral do Projeto
created: 2026-07-06
description: "Análise e documentação completa do projeto WeatherApp: uma aplicação React que apresenta previsões meteorológicas para cidades portuguesas usando a API pública do IPMA."
owner: developer
tags: [react, weather, ipma, portugal, overview]
updated: 2026-07-06
---

# WeatherApp — Visão Geral do Projeto

<!-- maestru:summary -->
Aplicação React responsiva que apresenta previsões meteorológicas diárias para cidades e ilhas de Portugal, consumindo a API pública do IPMA. Suporta vistas distintas para browser e mobile, modo dia/noite, e está publicada no GitHub Pages.
<!-- /maestru:summary -->

## Descrição

Aplicação web React que mostra previsões meteorológicas diárias para cidades e ilhas de Portugal, usando a **API pública do IPMA** (Instituto Português do Mar e da Atmosfera). É responsiva, com vistas distintas para browser e dispositivos móveis.

Está publicada em: https://Victor-Candeias.github.io/weatherapp

---

## Stack Tecnológica

| Camada | Tecnologia | Versão |
|--------|-----------|--------|
| UI Framework | React | 18.2 |
| Estilos | CSS Modules + Bootstrap | 5.2.3 |
| Detecção de dispositivo | react-device-detect | 2.2.3 |
| Deploy | GitHub Pages (gh-pages) | 5.0.0 |
| Testes | @testing-library/react | 13.4.0 |
| Build | Create React App (react-scripts) | 5.0.1 |

---

## Arquitetura de Componentes

```
App
├── Header
│   └── ComboBox          ← seletor de cidade
└── Body
    ├── ItemBrowser        ← card de previsão (desktop)
    └── ItemMobile         ← card de previsão (mobile)
```

### Componentes

| Componente | Caminho | Responsabilidade |
|-----------|---------|-----------------|
| `App` | `src/components/App.js` | Componente raiz; fetches globais (cidades, vento, precipitação); gestão de estado principal |
| `Header` | `src/components/header/Header.js` | Barra de topo com título e seletor de cidade; adapta-se a mobile/desktop |
| `ComboBox` | `src/components/comboBox/ComboBox.js` | Dropdown Bootstrap para selecionar cidade |
| `Body` | `src/components/body/Body.js` | Fetch de previsão da cidade selecionada; renderiza `ItemBrowser` ou `ItemMobile` |
| `ItemBrowser` | `src/components/itemBrowser/ItemBrowser.js` | Card de previsão diária para desktop (tabela compacta) |
| `ItemMobile` | `src/components/itemMobile/ItemMobile.js` | Card de previsão diária para mobile (layout expandido) |

### Custom Hook

| Hook | Caminho | Responsabilidade |
|------|---------|-----------------|
| `useHttp` | `src/hooks/use-http.js` | Abstração genérica para fetch HTTP (`GET` / outros métodos), com estado `isLoading` e `error` |

---

## APIs IPMA Consumidas

| Dados | URL |
|-------|-----|
| Lista de distritos/ilhas | `https://api.ipma.pt/open-data/distrits-islands.json` |
| Velocidade do vento (classes) | `https://api.ipma.pt/open-data/wind-speed-daily-classe.json` |
| Precipitação (classes) | `https://api.ipma.pt/open-data/precipitation-classe.json` |
| Previsão diária por cidade | `https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/{globalIdLocal}.json` |

---

## Funcionalidades

- **Seleção de cidade**: dropdown com todas as cidades/ilhas portuguesas, ordenadas alfabeticamente.
- **Previsão multi-dia**: lista os dias disponíveis para a cidade selecionada.
- **Dados exibidos por dia**: temperatura mínima/máxima, ícone de tipo de tempo, direção do vento, velocidade do vento (descrição), probabilidade de precipitação.
- **Modo Dia/Noite**: detecta a hora local (7h–19h = dia) e usa ícones e estilos diferenciados.
- **Layout responsivo**: `BrowserView` e `MobileView` via `react-device-detect`.
- **Imagens por cidade**: cada cidade tem uma imagem associada em `public/images/{cidade}.png`.

---

## Estrutura de Pastas

```
weatherapp/
├── public/
│   └── images/          ← ícones SVG de tempo, setas de vento, fotos de cidades
├── src/
│   ├── components/
│   │   ├── App.js / App.module.css
│   │   ├── body/
│   │   ├── comboBox/
│   │   ├── header/
│   │   ├── itemBrowser/
│   │   └── itemMobile/
│   ├── hooks/
│   │   └── use-http.js
│   ├── index.js
│   └── index.css
├── .maestru/
└── package.json
```

---

## Scripts Disponíveis

| Script | Comando | Descrição |
|--------|---------|-----------|
| Desenvolvimento | `npm start` | Inicia servidor local em `localhost:3000` |
| Build | `npm run build` | Gera bundle de produção em `/build` |
| Deploy | `npm run deploy` | Build + publica no GitHub Pages |
| Testes | `npm test` | Executa testes com Jest |

---

## Pontos de Melhoria Identificados

1. **Duplicação de código**: `ItemBrowser` e `ItemMobile` partilham lógica idêntica (cálculo de imagens, filtragem de vento/chuva). Podia ser extraída para um hook ou utilitário.
2. **Bug no `ItemMobile`**: a lógica de cor da probabilidade de chuva tem dois `if` com a mesma condição (`< 30`), nunca atingindo o estado amarelo.
3. **Ausência de tratamento de erro na UI**: o hook `useHttp` captura erros mas nenhum componente os exibe ao utilizador.
4. **`console.log` no `ComboBox`**: debug deixado em produção.
5. **Keys em listas**: os `map()` em `Body.js` não passam `key` para `ItemBrowser`/`ItemMobile`, gerando warnings do React.
6. **`class` vs `className` no `ItemMobile`**: usa `class={...}` numa `<table>`, o que é inválido em JSX.

