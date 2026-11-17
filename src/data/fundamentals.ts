import type { Localized } from "@/i18n/config";

/**
 * Projetos académicos e fundamentos: exercícios e trabalhos da formação.
 * Cada ponto tem de corresponder a ficheiros existentes — não transformar
 * exercícios em aplicações completas nem acrescentar tecnologias sem prova.
 */
export type FundamentalArea = {
  id: string;
  title: Localized;
  /** Contexto factual (unidade de formação ou tipo de trabalho). */
  context: Localized;
  technologies: string[];
  points: Localized<string[]>;
};

export const fundamentals: FundamentalArea[] = [
  {
    id: "oop",
    title: { pt: "Programação orientada a objetos", en: "Object-oriented programming" },
    context: { pt: "Exercícios da formação TPSI", en: "TPSI course exercises" },
    technologies: ["Kotlin", "Java"],
    points: {
      pt: [
        "Classes com atributos, métodos e construtores: retângulo, pessoa, conta corrente, televisor e tamagotchi, em Kotlin.",
        "Regras de validação dentro das classes, como manter o canal e o volume do televisor dentro de limites válidos.",
        "Gestão de uma lista de pessoas em Java com ArrayList: adicionar, pesquisar, evitar duplicados e remover.",
      ],
      en: [
        "Classes with attributes, methods and constructors: rectangle, person, bank account, TV and tamagotchi, in Kotlin.",
        "Validation rules inside classes, such as keeping the TV channel and volume within valid limits.",
        "Managing a list of people in Java with ArrayList: add, search, avoid duplicates and remove.",
      ],
    },
  },
  {
    id: "python-logic",
    title: { pt: "Lógica de programação em Python", en: "Programming logic in Python" },
    context: { pt: "Exercícios e trabalho final de unidade", en: "Exercises and a unit final assignment" },
    technologies: ["Python"],
    points: {
      pt: [
        "Exercícios de estruturas sequenciais, condições e ciclos.",
        "Gestor de tarefas em consola, organizado em módulos: adicionar, listar, consultar, alterar estado, concluir, remover, pesquisar, filtrar e mostrar estatísticas, com validação de datas.",
      ],
      en: [
        "Exercises on sequential structures, conditions and loops.",
        "Console task manager split into modules: add, list, view, change status, complete, remove, search, filter and show statistics, with date validation.",
      ],
    },
  },
  {
    id: "text-processing",
    title: { pt: "Processamento de texto", en: "Text processing" },
    context: { pt: "Exercício de processamento de linguagem natural", en: "Natural language processing exercise" },
    technologies: ["Python", "NLTK"],
    points: {
      pt: [
        "Limpeza de comentários de clientes: minúsculas e remoção de pontuação.",
        "Tokenização e remoção de stopwords em português com NLTK.",
        "Análise de palavras que mudam o sentido de uma frase, como «não» e «muito», com uma tabela-resumo.",
      ],
      en: [
        "Cleaning customer comments: lowercasing and removing punctuation.",
        "Tokenisation and Portuguese stopword removal with NLTK.",
        "Analysis of words that change a sentence's meaning, such as “not” and “very”, with a summary table.",
      ],
    },
  },
  {
    id: "desktop",
    title: { pt: "Aplicações desktop", en: "Desktop applications" },
    context: { pt: "Exercícios de C#", en: "C# exercises" },
    technologies: ["C#", "Windows Forms"],
    points: {
      pt: [
        "Calculadora em Windows Forms com as quatro operações e limpeza dos campos, através de eventos de botões.",
        "Calculadora de consola com leitura de valores e escolha da operação.",
      ],
      en: [
        "Windows Forms calculator with the four operations and a clear button, driven by button events.",
        "Console calculator reading values and choosing the operation.",
      ],
    },
  },
  {
    id: "mongodb",
    title: { pt: "Modelação de dados em MongoDB", en: "Data modelling in MongoDB" },
    context: { pt: "Trabalho prático de bases de dados", en: "Databases practical assignment" },
    technologies: ["MongoDB"],
    points: {
      pt: [
        "Modelo de dados para um sistema de gestão de avaliações: alunos, turmas, unidades curriculares e notas.",
        "Scripts de criação de coleções com validação, inserção, consultas, atualizações e remoções.",
        "Agregações com $lookup, $unwind, $group e $avg, e relatório do trabalho.",
      ],
      en: [
        "Data model for a grade management system: students, classes, course units and grades.",
        "Scripts for creating validated collections, inserting, querying, updating and deleting data.",
        "Aggregations with $lookup, $unwind, $group and $avg, plus a written report.",
      ],
    },
  },
  {
    id: "git",
    title: { pt: "Controlo de versões", en: "Version control" },
    context: { pt: "Avaliação prática de Git e GitHub", en: "Practical Git and GitHub assessment" },
    technologies: ["Git", "GitHub"],
    points: {
      pt: [
        "Trabalho com branches, resolução de conflitos locais e no GitHub, e integração por pull request.",
      ],
      en: [
        "Working with branches, resolving conflicts locally and on GitHub, and merging through a pull request.",
      ],
    },
  },
];
