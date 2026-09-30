"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type TransformerTab = "overview" | "tokenizer" | "attention" | "sampling";

interface TokenData {
  text: string;
  id: number;
  pos: number;
}

const PRESET_PROMPTS = [
  "The animal didn't cross the street because it was too tired.",
  "Attention is all you need for sequence modeling.",
  "The transformer architecture revolutionized modern artificial intelligence.",
  "def review_code_diff(pr_patch: str) -> dict:",
];

// Attention head interpretations
const ATTENTION_HEADS = [
  { id: 1, name: "Head 1: Coreference & Pronoun Resolution", focus: "Binds pronouns ('it') to their antecedents ('animal')" },
  { id: 2, name: "Head 2: Syntactic & Dependency Structure", focus: "Connects verbs ('cross') to direct objects ('street')" },
  { id: 3, name: "Head 3: Positional Proximity", focus: "Attends to adjacent and neighboring token tokens" },
  { id: 4, name: "Head 4: Semantic Context & Modifiers", focus: "Associates adjectives ('tired') with subjects" },
];

export default function TransformerLab() {
  const [activeTab, setActiveTab] = useState<TransformerTab>("attention");
  const [prompt, setPrompt] = useState(PRESET_PROMPTS[0]);
  const [selectedTokenIndex, setSelectedTokenIndex] = useState<number>(0);
  const [selectedHead, setSelectedHead] = useState<number>(1);
  const [temperature, setTemperature] = useState<number>(0.7);
  const [topK, setTopK] = useState<number>(5);
  const [topP, setTopP] = useState<number>(0.9);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTokens, setGeneratedTokens] = useState<string[]>([]);

  // Tokenize the prompt into realistic BPE-style tokens
  const tokens: TokenData[] = useMemo(() => {
    // Basic regex splitting mimicking subword tokenization
    const rawTokens = prompt.match(/\w+|[^\s\w]/g) || ["Start"];
    return rawTokens.map((t, idx) => ({
      text: t,
      id: 1000 + Math.abs(hashCode(t) % 49000),
      pos: idx,
    }));
  }, [prompt]);

  // Adjust selected token index if out of bounds
  useEffect(() => {
    if (selectedTokenIndex >= tokens.length) {
      setSelectedTokenIndex(0);
    }
  }, [tokens.length, selectedTokenIndex]);

  // Compute realistic Attention Matrix based on selected head and tokens
  const attentionWeights = useMemo(() => {
    const n = tokens.length;
    if (n === 0) return [];

    const weights: number[][] = [];

    for (let i = 0; i < n; i++) {
      const row: number[] = [];
      const currentToken = tokens[i].text.toLowerCase();

      for (let j = 0; j < n; j++) {
        const targetToken = tokens[j].text.toLowerCase();
        let rawScore = 0.1;

        if (selectedHead === 1) {
          // Coreference: "it" attends strongly to "animal"
          if (currentToken === "it" && targetToken.includes("animal")) rawScore = 3.8;
          else if (currentToken === "tired" && targetToken.includes("animal")) rawScore = 2.4;
          else if (i === j) rawScore = 1.2;
          else rawScore = 0.2 + (Math.sin(i * 3 + j * 7) * 0.15 + 0.15);
        } else if (selectedHead === 2) {
          // Syntax: verbs attend to nouns
          if (currentToken.includes("cross") && targetToken.includes("street")) rawScore = 3.2;
          else if (currentToken.includes("didn") && targetToken.includes("cross")) rawScore = 2.9;
          else if (i === j) rawScore = 0.8;
          else rawScore = 0.3 + (Math.cos(i + j) * 0.2 + 0.2);
        } else if (selectedHead === 3) {
          // Positional: strong diagonal and adjacent
          const dist = Math.abs(i - j);
          rawScore = Math.max(0.1, 4.0 - dist * 1.1);
        } else {
          // Semantic Context
          if (currentToken === "tired" && (targetToken === "too" || targetToken === "because")) rawScore = 3.1;
          else if (currentToken === "street" && targetToken === "cross") rawScore = 2.7;
          else if (i === j) rawScore = 1.0;
          else rawScore = 0.4 + (Math.sin(i * j) * 0.2 + 0.2);
        }

        row.push(rawScore);
      }

      // Softmax normalization across the row: exp(x_i) / sum(exp(x_j))
      const expRow = row.map((s) => Math.exp(s));
      const sumExp = expRow.reduce((acc, v) => acc + v, 0);
      const normalized = expRow.map((v) => Math.round((v / sumExp) * 100) / 100);

      weights.push(normalized);
    }

    return weights;
  }, [tokens, selectedHead]);

  // Autoregressive Next-Token Candidate Predictions
  const nextTokenCandidates = useMemo(() => {
    const lastToken = tokens[tokens.length - 1]?.text.toLowerCase() || "";

    // Candidate dictionary depending on context
    const pool = [
      { text: "Consequently", baseLogit: 4.2 },
      { text: "Therefore", baseLogit: 3.8 },
      { text: "Instead", baseLogit: 3.4 },
      { text: "It", baseLogit: 3.1 },
      { text: "So", baseLogit: 2.8 },
      { text: "Meanwhile", baseLogit: 2.3 },
      { text: "However", baseLogit: 1.9 },
      { text: "Furthermore", baseLogit: 1.5 },
    ];

    if (lastToken === ":" || prompt.includes("def ")) {
      pool[0] = { text: "    diff", baseLogit: 4.8 };
      pool[1] = { text: "    #", baseLogit: 4.1 };
      pool[2] = { text: "    tree", baseLogit: 3.5 };
      pool[3] = { text: "    return", baseLogit: 3.2 };
    }

    // Apply Temperature to Logits: z_i / T
    const scaledLogits = pool.map((c) => ({
      text: c.text,
      logit: c.baseLogit / Math.max(0.1, temperature),
    }));

    // Softmax calculation
    const maxLogit = Math.max(...scaledLogits.map((c) => c.logit));
    const exps = scaledLogits.map((c) => Math.exp(c.logit - maxLogit));
    const sumExps = exps.reduce((a, b) => a + b, 0);

    const scored = scaledLogits.map((c, i) => ({
      text: c.text,
      prob: exps[i] / sumExps,
    }));

    // Sort descending
    scored.sort((a, b) => b.prob - a.prob);

    // Apply Top-K filtering
    const topKFiltered = scored.slice(0, topK);

    // Apply Top-P (Nucleus) filtering
    let cumProb = 0;
    const finalFiltered = [];
    for (const item of topKFiltered) {
      finalFiltered.push(item);
      cumProb += item.prob;
      if (cumProb >= topP) break;
    }

    return finalFiltered;
  }, [tokens, prompt, temperature, topK, topP]);

  // Step next token into prompt
  const stepNextToken = () => {
    if (nextTokenCandidates.length === 0) return;
    setIsGenerating(true);

    setTimeout(() => {
      // Sample token according to probability distribution
      const rand = Math.random();
      let cumulative = 0;
      let chosen = nextTokenCandidates[0].text;

      for (const cand of nextTokenCandidates) {
        cumulative += cand.prob;
        if (rand <= cumulative) {
          chosen = cand.text;
          break;
        }
      }

      setGeneratedTokens((prev) => [...prev, chosen]);
      setPrompt((prev) => prev.trim() + " " + chosen);
      setIsGenerating(false);
    }, 200);
  };

  const resetPrompt = (p: string) => {
    setPrompt(p);
    setGeneratedTokens([]);
    setSelectedTokenIndex(0);
  };

  return (
    <div className="w-full flex flex-col bg-surface/75 border border-stroke rounded-3xl overflow-hidden backdrop-blur-xl shadow-2xl">
      {/* Top Banner & Mode Tabs */}
      <div className="p-5 sm:p-6 border-b border-stroke flex flex-col md:flex-row md:items-center justify-between gap-4 bg-black/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#89AACC] animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#89AACC]">
              Transformer Core Architecture Lab
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-display italic text-text-primary tracking-tight">
            How LLM Transformers Compute Attention & Tokens
          </h3>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 p-1 bg-surface rounded-2xl border border-white/10 text-xs font-mono overflow-x-auto">
          {[
            { id: "attention", label: "1. Self-Attention Matrix" },
            { id: "sampling", label: "2. Next-Token Sampling" },
            { id: "tokenizer", label: "3. Embeddings & Pos Encoding" },
            { id: "overview", label: "4. Architecture Overview" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TransformerTab)}
              className={`px-3.5 py-2 rounded-xl transition-all shrink-0 ${
                activeTab === tab.id
                  ? "bg-text-primary text-bg font-semibold shadow-md"
                  : "text-muted hover:text-text-primary hover:bg-white/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Preset Prompt Selector & Input */}
      <div className="p-4 sm:p-6 border-b border-stroke bg-surface/30">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <label className="text-[11px] font-mono text-muted uppercase tracking-wider">
            Active Prompt Sequence ({tokens.length} tokens):
          </label>
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-mono text-muted/60">Presets:</span>
            {PRESET_PROMPTS.map((p, idx) => (
              <button
                key={idx}
                onClick={() => resetPrompt(p)}
                className={`text-[10px] font-mono px-2.5 py-1 rounded-lg border transition-all ${
                  prompt === p
                    ? "bg-white/15 text-text-primary border-white/20"
                    : "bg-black/30 text-muted border-white/5 hover:text-text-primary"
                }`}
              >
                Sample {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Editable Prompt Bar */}
        <div className="relative">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full p-3.5 rounded-xl bg-black/60 border border-white/10 text-sm sm:text-base font-mono text-text-primary focus:outline-none focus:border-[#89AACC] transition-all"
            placeholder="Type any sentence to inspect transformer attention and generation..."
          />
        </div>
      </div>

      {/* Main Interactive Stage Area */}
      <div className="p-5 sm:p-6 min-h-[460px] flex flex-col justify-between">
        {/* ================= TAB 1: SELF-ATTENTION ================= */}
        {activeTab === "attention" && (
          <div className="space-y-6">
            {/* Attention Head Selector */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-black/40 border border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-muted">Active Attention Head:</span>
                <div className="flex items-center gap-1">
                  {ATTENTION_HEADS.map((head) => (
                    <button
                      key={head.id}
                      onClick={() => setSelectedHead(head.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                        selectedHead === head.id
                          ? "bg-[#4E85BF] text-white font-bold"
                          : "bg-surface text-muted hover:text-text-primary"
                      }`}
                    >
                      H{head.id}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-[11px] font-mono text-[#89AACC]">
                {ATTENTION_HEADS.find((h) => h.id === selectedHead)?.focus}
              </div>
            </div>

            {/* Token Sequence Pills (Click to inspect source token) */}
            <div>
              <div className="text-xs font-mono text-muted mb-2 flex items-center justify-between">
                <span>Click a source token ($Q$) to visualize which target tokens ($K$) it attends to:</span>
                <span className="text-[#89AACC]">
                  Selected: &quot;{tokens[selectedTokenIndex]?.text}&quot; (pos {selectedTokenIndex})
                </span>
              </div>

              <div className="flex flex-wrap gap-2 p-3 rounded-2xl bg-black/50 border border-white/10">
                {tokens.map((tok, idx) => {
                  const weight = attentionWeights[selectedTokenIndex]?.[idx] || 0;
                  const isSelected = selectedTokenIndex === idx;

                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedTokenIndex(idx)}
                      className={`relative px-3 py-2 rounded-xl text-xs sm:text-sm font-mono transition-all flex flex-col items-center gap-1 border ${
                        isSelected
                          ? "bg-[#4E85BF] text-white border-white/40 shadow-lg scale-105"
                          : "bg-surface/80 border-white/10 text-text-primary hover:border-white/30"
                      }`}
                      style={{
                        backgroundColor: !isSelected
                          ? `rgba(78, 133, 191, ${Math.max(0.1, weight * 0.85)})`
                          : undefined,
                      }}
                    >
                      <span className="font-semibold">{tok.text}</span>
                      <span className="text-[10px] font-mono opacity-70">
                        {Math.round(weight * 100)}%
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live Attention Heatmap Grid */}
            <div className="p-4 rounded-2xl bg-black/60 border border-white/10 overflow-x-auto">
              <div className="flex items-center justify-between mb-3 text-xs font-mono text-muted">
                <span>Attention Matrix Heatmap: Softmax(Q · Kᵀ / √dₖ)</span>
                <span className="text-[11px] text-muted/70">Rows = Queries (Q), Columns = Keys (K)</span>
              </div>

              <div className="inline-block min-w-full">
                {/* Heatmap Column Headers */}
                <div className="flex gap-1.5 mb-1.5 pl-20">
                  {tokens.map((t, j) => (
                    <div
                      key={j}
                      className="w-10 sm:w-12 text-center text-[10px] font-mono text-muted truncate"
                      title={t.text}
                    >
                      {t.text}
                    </div>
                  ))}
                </div>

                {/* Heatmap Rows */}
                {tokens.map((rowTok, i) => (
                  <div key={i} className="flex items-center gap-1.5 mb-1.5">
                    <div
                      className={`w-20 text-right pr-2 text-xs font-mono truncate ${
                        selectedTokenIndex === i ? "text-[#89AACC] font-bold" : "text-muted"
                      }`}
                      title={rowTok.text}
                    >
                      {rowTok.text}
                    </div>

                    {tokens.map((_, j) => {
                      const score = attentionWeights[i]?.[j] || 0;
                      return (
                        <div
                          key={j}
                          onClick={() => setSelectedTokenIndex(i)}
                          className="w-10 sm:w-12 h-8 rounded-md flex items-center justify-center text-[10px] font-mono cursor-pointer transition-all hover:scale-110"
                          style={{
                            backgroundColor: `rgba(78, 133, 191, ${score})`,
                            color: score > 0.4 ? "#FFFFFF" : "rgba(255,255,255,0.6)",
                            border:
                              selectedTokenIndex === i
                                ? "1px solid rgba(137, 170, 204, 0.8)"
                                : "1px solid rgba(255,255,255,0.05)",
                          }}
                          title={`Query "${rowTok.text}" -> Key "${tokens[j].text}": ${(score * 100).toFixed(1)}%`}
                        >
                          {(score * 100).toFixed(0)}%
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: SAMPLING & GENERATION ================= */}
        {activeTab === "sampling" && (
          <div className="space-y-6">
            {/* Sampling Hyperparameters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-black/40 border border-white/10">
              {/* Temperature Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-muted">Temperature ($T$):</span>
                  <span className="text-text-primary font-bold">{temperature}</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1.8"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                  className="w-full accent-[#89AACC] cursor-pointer"
                />
                <p className="text-[10px] font-mono text-muted/70">
                  {temperature < 0.4
                    ? "Greedy / Deterministic"
                    : temperature > 1.2
                    ? "High Entropy / Creative"
                    : "Balanced / Standard"}
                </p>
              </div>

              {/* Top-K Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-muted">Top-K Truncation:</span>
                  <span className="text-text-primary font-bold">{topK}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="8"
                  step="1"
                  value={topK}
                  onChange={(e) => setTopK(Number(e.target.value))}
                  className="w-full accent-[#4E85BF] cursor-pointer"
                />
                <p className="text-[10px] font-mono text-muted/70">
                  Restricts sampling to the top {topK} most probable tokens.
                </p>
              </div>

              {/* Top-P Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-muted">Top-P (Nucleus):</span>
                  <span className="text-text-primary font-bold">{Math.round(topP * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.4"
                  max="1.0"
                  step="0.05"
                  value={topP}
                  onChange={(e) => setTopP(Number(e.target.value))}
                  className="w-full accent-[#34D399] cursor-pointer"
                />
                <p className="text-[10px] font-mono text-muted/70">
                  Cumulative mass threshold for dynamic candidate pruning.
                </p>
              </div>
            </div>

            {/* Candidate Distribution Bars */}
            <div className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-mono font-semibold text-text-primary">
                    Next-Token Softmax Probability Distribution
                  </h4>
                  <p className="text-xs font-mono text-muted mt-0.5">
                    P(wᵢ) = exp(zᵢ / T) / ∑ exp(zⱼ / T) (Evaluated after linear LM head)
                  </p>
                </div>

                {/* Step button */}
                <button
                  onClick={stepNextToken}
                  disabled={isGenerating}
                  className="px-5 py-2.5 rounded-full bg-text-primary text-bg font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-all shadow-lg flex items-center gap-1.5"
                >
                  <span>{isGenerating ? "Predicting..." : "Step Next Token"}</span>
                  <span>→</span>
                </button>
              </div>

              {/* Distribution Bar Chart */}
              <div className="space-y-2.5 pt-2">
                {nextTokenCandidates.map((cand, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="font-semibold text-text-primary">
                        &quot;{cand.text}&quot;
                      </span>
                      <span className="text-[#89AACC] font-bold">
                        {(cand.prob * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-surface overflow-hidden border border-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${cand.prob * 100}%` }}
                        transition={{ duration: 0.3 }}
                        className="h-full accent-gradient rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Generated Sequence Stream */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-xs font-mono">
              <span className="text-muted block mb-1">Cumulative Generated Extension:</span>
              <p className="text-text-primary text-sm font-mono leading-relaxed">
                {prompt}{" "}
                {generatedTokens.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[#89AACC] font-bold underline decoration-[#89AACC]/40 mr-1"
                  >
                    {t}
                  </span>
                ))}
              </p>
            </div>
          </div>
        )}

        {/* ================= TAB 3: TOKENIZER & POSITIONAL ================= */}
        {activeTab === "tokenizer" && (
          <div className="space-y-6">
            {/* Token Table */}
            <div className="p-5 rounded-2xl bg-black/60 border border-white/10">
              <h4 className="text-sm font-mono font-semibold text-text-primary mb-2">
                Subword Byte-Pair Encoding (BPE) & Positional Embeddings
              </h4>
              <p className="text-xs font-mono text-muted mb-4 leading-relaxed">
                Because transformers process all tokens simultaneously without recurrence, Positional Encoding (PE) must be added to each token embedding vector (E_token + PE_pos).
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
                {tokens.map((tok, idx) => {
                  const peSin = Math.sin(idx / Math.pow(10000, 0 / 64)).toFixed(3);
                  const peCos = Math.cos(idx / Math.pow(10000, 2 / 64)).toFixed(3);

                  return (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-surface/60 border border-white/10 flex flex-col gap-1 text-xs font-mono"
                    >
                      <div className="flex items-center justify-between text-muted text-[10px]">
                        <span>pos: {tok.pos}</span>
                        <span>id: {tok.id}</span>
                      </div>
                      <span className="font-bold text-sm text-text-primary">&quot;{tok.text}&quot;</span>
                      <div className="text-[10px] text-[#89AACC] mt-1 space-y-0.5 font-mono">
                        <div>PE_sin: {peSin}</div>
                        <div>PE_cos: {peCos}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Formula Breakdown Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                <span className="text-xs font-mono uppercase text-[#89AACC]">Mathematical Formulation</span>
                <h5 className="text-base font-display italic text-text-primary">
                  Sinusoidal Positional Encoding
                </h5>
                <div className="p-3 rounded-xl bg-black/60 font-mono text-xs text-text-primary/90 space-y-1">
                  <div>PE(pos, 2i) = sin(pos / 10000^(2i / d_model))</div>
                  <div>PE(pos, 2i+1) = cos(pos / 10000^(2i / d_model))</div>
                </div>
                <p className="text-xs font-mono text-muted leading-relaxed">
                  Allows the model to easily learn relative positions because for any fixed offset k, PE_(pos+k) can be represented as a linear function of PE_pos.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                <span className="text-xs font-mono uppercase text-[#89AACC]">Linear Projections</span>
                <h5 className="text-base font-display italic text-text-primary">
                  Query, Key, Value Projections
                </h5>
                <div className="p-3 rounded-xl bg-black/60 font-mono text-xs text-text-primary/90 space-y-1">
                  <div>Q = X · W_Q  (d_model × d_k)</div>
                  <div>K = X · W_K  (d_model × d_k)</div>
                  <div>V = X · W_V  (d_model × d_v)</div>
                </div>
                <p className="text-xs font-mono text-muted leading-relaxed">
                  Input vector representations are multiplied by learned weight matrices to project tokens into specialized subspaces for similarity matching.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 4: ARCHITECTURE OVERVIEW ================= */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-black/60 border border-white/10">
              <h4 className="text-base sm:text-lg font-display italic text-text-primary mb-2">
                The Anatomy of a Modern Transformer Block
              </h4>
              <p className="text-xs sm:text-sm text-muted font-mono leading-relaxed mb-6">
                From raw tokens to logits: how information flows through multi-head attention, layer normalization, residual skip connections, and the feed-forward network.
              </p>

              {/* Layer-by-layer visual flowchart */}
              <div className="space-y-3 font-mono text-xs max-w-2xl mx-auto">
                {[
                  {
                    step: "01. Input Embedding & Positional Encoding",
                    desc: "Maps token IDs to high-dimensional vectors and injects sequence order (E + PE).",
                    color: "border-[#89AACC]/40 bg-[#89AACC]/10 text-[#89AACC]",
                  },
                  {
                    step: "02. Multi-Head Self-Attention (MHA)",
                    desc: "Computes parallel attention heads Softmax(Q Kᵀ / √dₖ) V to capture diverse linguistic relationships.",
                    color: "border-[#4E85BF]/40 bg-[#4E85BF]/10 text-text-primary",
                  },
                  {
                    step: "03. Add & LayerNorm (Residual Connection)",
                    desc: "Preserves gradient highways by adding input before attention (x + MHA(x)) and normalizing variance.",
                    color: "border-white/10 bg-white/5 text-muted",
                  },
                  {
                    step: "04. Position-Wise Feed-Forward Network (FFN)",
                    desc: "Two linear transformations with nonlinear activation GELU(x W₁ + b₁) W₂ + b₂. Expands d_model → 4d_model.",
                    color: "border-[#34D399]/40 bg-[#34D399]/10 text-emerald-300",
                  },
                  {
                    step: "05. Add & LayerNorm (Final Block State)",
                    desc: "Applies second residual connection (x + FFN(x)). Repeated across N stacked layers.",
                    color: "border-white/10 bg-white/5 text-muted",
                  },
                  {
                    step: "06. Unembedding LM Head & Softmax",
                    desc: "Projects final hidden states onto vocabulary dimension |V| to output next-token logits.",
                    color: "border-white/20 bg-text-primary text-bg font-bold",
                  },
                ].map((layer, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${layer.color}`}
                  >
                    <div>
                      <div className="font-semibold text-sm">{layer.step}</div>
                      <div className="text-[11px] opacity-80 mt-0.5">{layer.desc}</div>
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider shrink-0">
                      Layer 0{idx + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Educational Summary Bar */}
      <div className="p-4 sm:p-5 border-t border-stroke bg-black/50 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-muted">
        <div className="flex items-center gap-2">
          <span className="text-text-primary font-semibold">Active Lab:</span>
          <span>Transformer Mathematics & Self-Attention</span>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <span>Vocabulary: <strong className="text-text-primary">50,257 BPE Tokens</strong></span>
          <span>Hidden Dimension (d_model): <strong className="text-text-primary">768</strong></span>
          <span>Heads: <strong className="text-text-primary">12 Heads</strong></span>
        </div>
      </div>
    </div>
  );
}

// Utility hash function for token IDs
function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}
