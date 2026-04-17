---
slug: path-integral
title: "[논문] Space-Time Approach to Non-Relativistic Quantum Mechanics"
authors: [hwkim]
tags: [논문, 물리, 양자역학]
---

R.P. Feynman의 'Space-Time Approach to Non-Relativistic Quantum Mechanics' 논문 초록(Abstract) 정리 노트

<!-- truncate -->

<br>

## 1. Abstract: 양자역학의 새로운 공식화 (Path Integral Formulation)

### 1) 확률(Probability)

* 양자역학에서 특정 사건이 일어날 확률은 고전역학처럼 각 경로의 확률 자체를 단순히 더하는 것이 아니다.
* **사건이 일어날 수 있는 모든 대안적인 방법(Alternative ways/paths)** 에서 발생하는 **복소수 기여도(Complex contributions, 확률 진폭)** 들을 모두 더한 후, 그 '합의 절댓값을 제곱'하여 구한다.

<br>

<table width="100%">
  <tr>
    <th colspan="2">사건이 일어날 수 있는 모든 대안적인 방법(Alternative ways/paths)</th>
  </tr>
  <tr>
    <td width="320" align="center"><img src="https://github.com/user-attachments/assets/29a70da5-d0fa-43e0-bafa-53bb2330fba5" width="300" height="300" /></td>
    <td>입자가 출발점 A에서 도착점 B로 가는 경로는 무한(Infinite)하기에, <br> 각 경로마다 방향이 다른 화살표 형태의 기여도($e^{iS/\hbar}$)가 무한히 도출된다.</td>
  </tr>
</table>

<br>

<table width="100%">
  <tr>
    <th colspan="2">$e^{iS/\hbar}$ 함수의 그래프</th>
  </tr>
  <tr>
    <td width="320" align="center"><img src="https://github.com/user-attachments/assets/584465da-f3fa-4bca-9083-e631c69e1a6b" width="300" height="300" /></td>
    <td>가로축은 실수부($Real$), 세로축은 허수부($Imaginary$)인 '복소평면'이다.<br><br> 원의 반지름(화살표의 길이)은 1로 고정되어 있다. 여기서 화살표가 가리키는 **각도(위상, Phase)**가 바로 앞서 배운 $S/\hbar$ 이고,<br><br> 경로의 물리적 수치($S$)에 따라 이 화살표가 빙글빙글 돌아가며 각기 다른 방향을 가리키게 된다.</td>
  </tr>
</table>

---

$$
P(Event) = |\text{Contribution}_1 + \text{Contribution}_2 + \dotsb|^2
$$

### 2) 시공간에서의 경로: $x(t)$ 와 Sum over Paths

* **Path $x(t)$:** * $x$는 위치(Space), $t$는 시간(Time)을 의미하며, $x(t)$는 시간에 따라 입자가 시공간(Space-time)을 이동하는 궤적(Trajectory)을 나타낸다.
* **Sum over Paths (경로의 합):** * 입자가 특정 시공간 영역 내에서 어떠한 경로 $x(t)$를 가질 확률은, 그 영역 안에 존재하는 **모든 가능한 경로(All possible paths)** 에서 나오는 기여(Contributions)들을 전부 합친 것의 절댓값 제곱이 된다.

---

### [핵심 심화] 기여도(Contribution)의 정체와 복소수(Complex)의 마법

이 논문의 가장 핵심적인 질문인 **"기여도란 무엇이며, 왜 복소수 기여(Complex Contribution)인가?"** 그리고 **"왜 화살표(벡터)라고 부르는가?"** 에 대한 해답이다.

**① 기여도(Contribution)의 진짜 이름: 확률 진폭 (Probability Amplitude)**
* 여기서 말하는 '기여도'는 특정 경로가 최종 결과에 미치는 영향을 나타내는 수학적 값으로, 정식 물리학 용어로는 **확률 진폭(Probability Amplitude)** 이라고 부른다. 
* 양자역학에서는 이 기여도를 단순히 0.2, 0.5 같은 '실수(Real Number)' 형태의 확률로 주지 않고, **크기와 방향을 가진 수학적 벡터** 형태로 부여한다.
    > 고전역학에선 A길로 갈 확률 30% B길로 갈 확률 40% 이면 70%인 두개를 더하기만 하면 된다.  

**② 물리적 화살표가 아닌 '복소평면 위의 벡터 (Complex Vector / Phasor)'**
* 일상에서 말하는 '벡터'는 3차원 공간에서 날아가는 공의 방향 같은 물리적 궤적을 떠올리기 쉽다. 
* 하지만 여기서의 기여도는 실제 공간에서 휘어지는 곡선이 **절대 아니다.** 실수부와 허수부로 이루어진 추상적인 수학 공간인 **Complex Plane 위에 존재하는 Vector**이다. 
* 수학적으로 자연상수 $e$의 지수에 허수 $i$가 붙은 형태($e^{i\theta}$)는 복소평면 상에서 **길이가 항상 1인 회전하는 화살표(Phasor)** 를 뜻한다. 
* 즉, 모든 경로의 기여도 크기(Magnitude)는 무조건 1로 동일하지만, **가리키는 방향(Phase, 위상)** 이 경로의 특성에 따라 제각각 다르다.

**③ 왜 실수(Real)가 아니라 복소수(Complex) 기여도인가? $\rightarrow$ 간섭(Interference) 현상**
* **실수 기여도(고전역학):** 단순히 숫자가 커진다. 입자가 갈 수 있는 길이 많아질수록 확률은 무조건 올라간다.
* **복소수 기여도(양자역학):** 복소수 벡터(화살표)이기 때문에 방향에 따라 서로 더해질 때 마법 같은 일이 일어난다.

<table width="100%">
  <tr>
    <th colspan="2">보강 간섭 (Constructive Interference)</th>
  </tr>
  <tr>
    <td width="320" align="center"><img src="https://github.com/user-attachments/assets/dd776ee2-35a7-419a-9ff4-e01e869f34dd" width="300" height="300" /></td>
    <td>경로들의 화살표 방향이 같다면, <br> 길이가 길어져 그곳에 입자가 도달할 확률이 폭발적으로 증가한다.</td>
  </tr>
</table>

<br>

<table width="100%">
  <tr>
    <th colspan="2">상쇄 간섭 (Destructive Interference)</th>
  </tr>
  <tr>
    <td width="320" align="center"><img src="https://github.com/user-attachments/assets/84136b9c-6ad5-4d1a-8fa7-cc5ee1dfe7d7" width="300" height="300" /></td>
    <td>경로들의 화살표 방향이 정반대라면, 두 화살표를 더했을 때 0이 되어버린다. <br> 즉, 입자가 갈 수 있는 길이 분명히 열려있는데도 불구하고, 복소수 기여도들이 서로를 갉아먹어 <br> 입자가 발견될 확률이 0%가 되는 <br> 양자역학 특유의 현상을 수학적으로 완벽하게 설명할 수 있게 된다.</td>
  </tr>
</table>

---
  
### 3) 화살표의 방향(Phase)을 결정하는 요소: $S$ 와 $\hbar$

각각의 경로가 만들어내는 화살표($e^{iS/\hbar}$)의 각도(Phase)는 다음과 같은 물리량에 의해 결정된다.

* **$S$ (Classical Action, 고전적 작용):** * 입자가 특정 경로를 통과하면서 얻는 물리적 수치(적분값). 경로의 모양(속도, 궤적, 시간 등)에 따라 이 Action 값이 달라진다.
* **$\hbar$ (Reduced Planck Constant, 환산 플랑크 상수):** * 양자 세계의 아주 작은 기본 단위 상수.
* **$S/\hbar$ (Phase, 위상):** * 경로의 Action($S$)을 기준값($\hbar$)으로 나눈 값으로, 이것이 바로 **화살표가 돌아간 각도(Phase angle)** 가 된다. $\hbar$가 워낙 미세한 상수이므로, 경로(Action)가 털끝만큼만 달라져도 화살표의 방향은 매우 격렬하게 돌아간다.

### 4) 파동함수(Wavefunction) $\psi(x, t)$ 와 중첩(Superposition)

$$
\psi(x, t) = \sum_{\text{All Paths}} e^{iS/\hbar}
$$

* 입자가 출발점 $A$에서 도착점 $B$로 가는 경로($Paths(A \rightarrow B$))는 **무한대($\infty$)** 이다.
* 따라서 각 경로마다 각도(Phase)가 제각각인 무한히 많은 화살표($e^{iS/\hbar}$)들이 존재한다.
* 이 무한한 확률 진폭(Contributions)들을 꼬리에 꼬리를 물고 전부 이어 붙여 벡터의 덧셈으로 더했을 때 (**중첩, Superposition**), 시작점에서 출발해 최종적으로 도달한 곳을 가리키는 **최종 화살표의 벡터합**이 바로 양자역학의 상태를 완벽하게 나타내는 **파동함수 $\psi(x, t)$** 가 된다.

## 1. Introduction (서론)

양자역학의 초기 역사와 본 논문이 제안하는 '세 번째 공식화(Third formulation)'의 배경 및 목적을 다룬다.

### 1) 양자역학의 두 가지 초기 공식화
현대 양자역학은 초창기에 수학적으로 완전히 다르게 생긴 두 가지 방식으로 출발했다.
* **슈뢰딩거(Schrödinger)**: 파동 관점의 미분 방정식 
* **하이젠베르크(Heisenberg)**: 입자 관점의 행렬 역학 (Matrix algebra) 
이 두 방식은 겉보기엔 달라 보였으나 수학적으로 완벽히 동일한 결과를 낸다는 것이 증명되었고, 훗날 폴 디랙(Paul Dirac)의 변환 이론(Transformation theory)으로 통합되었다.

### 2) 세 번째 공식화: 경로적분(Path Integral)의 탄생
본 논문은 비상대론적 양자역학을 설명하는 **세 번째 공식화**를 제시한다.
* **디랙의 힌트**: 디랙이 언급한 '고전적 작용($S$)과 양자역학의 관계'에서 영감을 받았다.
* **관점의 확장**: 특정 시간($t$)에 특정 위치($x$)에 있을 확률을 구하는 기존 방식에서 벗어나, 입자가 시간에 따라 이동하는 **'전체 궤적(Entire motion)' 자체에 확률 진폭(Probability amplitude)을 부여**한다.

### 3) 굳이 새로운 공식을 만든 4가지 이유
이 새로운 공식은 기존 이론(슈뢰딩거, 하이젠베르크)과 수학적으로 완벽히 동일한 결과를 내므로 근본적으로 새로운 결과는 없다. 그럼에도 불구하고 이 접근법을 제안하는 이유는 다음과 같다.

1. **새로운 관점의 즐거움**: 이미 아는 진리라도 전혀 새로운 시각으로 바라보는 것은 그 자체로 큰 기쁨(Pleasure)이다.
2. **복잡한 상호작용 시스템의 단순화**: 두 시스템 A, B가 상호작용할 때, 새로운 방식을 쓰면 방해되는 시스템 B의 좌표를 수학적으로 소거(Eliminate)하고 A의 수식만 수정하여 훨씬 쉽게 계산할 수 있다.
3. **양자전기역학(QED)으로의 응용**: 이러한 장점을 활용해, 양자전기역학 방정식에서 불필요한 장(Field)의 진동자 좌표들을 제거할 수 있다.
4. **미래 물리학을 위한 도약**: 이 완전히 새로운 관점이 훗날 꽉 막힌 현대 물리학의 한계를 깨고, 현재의 실험 결과들을 포괄할 수 있는 새로운 이론을 만드는 데 영감(Inspire)을 줄 것이라는 희망 때문이다.
