---
layout: post
title:  "A.I. algorithms worth noting"
author: dmimukto
categories: [ ai, algorithms ]
published: true
---

During my current research on various state-of-the-art AI algorithms for a thesis on artificial general intelligence (AGI), here are the most suitable algorithms I found:

| Algorithm Name | Algorithm Type(s) | Mathematical Expression (LaTeX) |
|----------------|-------------------|---------------------------------|
| Transformer | Deep Learning, Sequence Modeling | $\( \text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V \)$ |
| Mixture-of-Experts (MoE) | Deep Learning, Scalable Architecture | $\( y = \sum_{i=1}^N G(x)_i \cdot E_i(x) \)$, where $\( G(x) \)$ is the gating function, $\( E_i(x) \)$ is the $\( i \)$-th expert |
| MuZero | Reinforcement Learning, Planning | $\( \pi(s, a) = \text{MCTS}(s, \theta), \text{loss} = \sum_t (r_t - \hat{r}_t)^2 + (v_t - \hat{v}_t)^2 + \text{KL}(\pi_t, \hat{\pi}_t) \)$ |
| Model-Agnostic Meta-Learning (MAML) | Meta-Learning | $\( \theta' = \arg\min_\theta \sum_{\mathcal{T}_i} \mathcal{L}_{\mathcal{T}_i}\left(f_{\theta - \alpha \nabla_\theta \mathcal{L}_{\mathcal{T}_i}(f_\theta)}\right) \)$ |
| Denoising Diffusion Probabilistic Model (DDPM) | Generative Modeling | $\( p_\theta(x_0) = \int p_\theta(x_{0:T}) dx_{1:T}, \text{loss} = \mathbb{E}[\|\epsilon - \epsilon_\theta(x_t, t)\|^2] \)$ |
| Topological Swarm Optimizer (TSO) | Optimization, Swarm Intelligence | $\( x_{t+1}^i = x_t^i + v_t^i, v_t^i = v_t^i + \alpha (\text{centroid}_N - x_t^i) + \beta (g - x_t^i) \)$ (approximate) |
| Proximal Policy Optimization (PPO) | Reinforcement Learning | $\( \theta_{t+1} = \arg\max_\theta \mathbb{E} \left[ \min \left( r_t(\theta) \hat{A}_t, \text{clip}(r_t(\theta), 1-\epsilon, 1+\epsilon) \hat{A}_t \right) \right] \)$, where $\( r_t(\theta) \)$ is the policy ratio, $\( \hat{A}_t \)$ is the advantage |
| Multi-Agent Deep Deterministic Policy Gradient (MADDPG) | Reinforcement Learning, Multi-Agent | $\( \nabla_{\theta_i} J(\theta_i) = \mathbb{E} \left[ \nabla_{\theta_i} Q_i(s, a_1, \dots, a_N) \nabla_{\theta_i} \pi_i(s) \right] \)$, for agent $\( i \)$ |
| Dynamic Team Formation (DTF) | Multi-Agent Systems, Optimization | No standard expression; approximates $\( \text{Team}_t = \arg\max_T \sum_{i \in T} u_i(s, T) \)$, where $\( u_i \)$ is utility for agent $\( i \)$ |
| Few-Shot Learning (FSL) | Meta-Learning, Supervised Learning | Varies; often uses MAML-like loss: $\( \theta' = \theta - \alpha \nabla_\theta \mathcal{L}_{\text{support}}(f_\theta) \)$ |
| Reptile | Meta-Learning | $\( \theta \leftarrow \theta + \beta (\tilde{\theta} - \theta) \)$, where $\( \tilde{\theta} \)$ is the updated parameter after task-specific gradient steps |
| Reinforcement Learning (RL) | Reinforcement Learning | $\( Q(s, a) \leftarrow Q(s, a) + \alpha [r + \gamma \max_{a'} Q(s', a') - Q(s, a)] \)$ (Q-Learning as representative) |
| Bayesian Opinion/Preference Aggregation | Probabilistic Modeling | $\( P(\theta | D) \propto P(D | \theta) P(\theta) \)$, aggregates preferences via Bayesian inference |
| Federated Learning (FL) with Consensus Mechanisms | Distributed Learning | $\( w_{t+1} = \sum_{k=1}^K \frac{n_k}{n} w_k^t \)$, where $\( w_k^t \)$ is client $\( k \)$'s model, $\( n_k \)$ is data size (FedAvg as representative) |
| Graph-based Decision Aggregation (GDA) | Graph-Based Learning | No standard expression; approximates $\( d_v = \sum_{u \in N(v)} w_{uv} \cdot d_u \)$, where $\( d_v \)$ is decision at node $\( v \)$, $\( N(v) \)$ is neighbors |
| Hedge Algorithm | Online Learning | $\( w_{t+1}(i) = w_t(i) \cdot \beta^{l_t(i)} / Z_t \)$, where $\( l_t(i) \)$ is loss for expert $\( i \)$, $\( Z_t \)$ is normalization |
| Exponentiated Gradient | Online Learning | $\( w_{t+1}(i) \propto w_t(i) \exp(-\eta l_t(i)) \)$, where $\( \eta \)$ is learning rate |
| Adaptive Gradient Descent (AdaGrad) | Optimization | $\( \theta_{t+1} = \theta_t - \frac{\eta}{\sqrt{G_t + \epsilon}} \nabla_\theta \mathcal{L} \)$, where $\( G_t = \sum_{\tau=1}^t g_\tau^2 \)$, $\( g_\tau = \nabla_\theta \mathcal{L} \)$ |
| Adaptive Gradient Descent (Adam) | Optimization | $\( \theta_{t+1} = \theta_t - \eta \frac{\hat{m}_t}{\sqrt{\hat{v}_t} + \epsilon} \)$, where $\( \hat{m}_t, \hat{v}_t \)$ are bias-corrected moment estimates |
| Adaptive Gradient Descent (Adafactor) | Optimization | $\( \theta_{t+1} = \theta_t - \eta \frac{m_t}{\sqrt{v_t} + \epsilon} \)$, with low-rank approximation of $\( v_t \)$ |
| Online Mirror Descent | Optimization | $\( \theta_{t+1} = \arg\min_\theta \{ \eta \langle \nabla \mathcal{L}_t, \theta \rangle + D(\theta, \theta_t) \} \)$, where $\( D \)$ is Bregman divergence |
| Elastic Weight Consolidation (EWC) | Continual Learning | $\( \mathcal{L} = \mathcal{L}_{\text{new}} + \lambda \sum_i F_i (\theta_i - \theta_i^*)^2 \)$, where $\( F_i \)$ is Fisher information, $\( \theta_i^* \)$ is old task parameters |
| Gradient Episodic Memory (GEM) | Continual Learning | $\( \min_\theta \mathcal{L}_{\text{new}}, \text{s.t.} \langle \nabla \mathcal{L}_{\text{old}}, \theta - \theta_{\text{old}} \rangle \geq 0 \)$ |
| Tree of Thought (ToT) | Reasoning, Search | No standard expression; approximates $\( \text{Score}(n) = \sum_{p \in \text{paths}} w_p \cdot v_p \)$, where $\( v_p \)$ is value of reasoning path |
| Hierarchical Reinforcement Learning (HRL) | Reinforcement Learning | Varies; e.g., $\( Q(s, o) = \max_{o'} [r(s, o) + \gamma V(s', o')] \)$, where $\( o \)$ is high-level option |
