<template>
  <div id="app">
    <b-navbar >
      <img src="./imagens/redfox_logo_alta_branco.png" width="150" />
    </b-navbar>
    <b-container fluid>
      <b-row>
        <b-col cols="3" style="z-index:9999">
          <div ref="parentSidebar" id="parentx">
            <vs-button style="margin-left:280px; z-index:99999" class="bt_sidebar" v-if="active" @click="active=!active" type="filled">
              <vs-icon icon="chevron_left" />
            </vs-button>
            <vs-button  class="bt_sidebar" v-else @click="active=!active" type="filled">
              <vs-icon icon="chevron_right"  />
            </vs-button>
            <vs-sidebar
              :parent="$refs.parentSidebar"
              default-index="1"
              color="primary"
              class="sidebarx"
              spacer
              v-model="active"
            >
              <img src="./imagens/health.png" />
              <vs-input size="default" type="number" :value="current_hosp" label="Pacientes COVID-19 atualmente hospitalizados" />
              <img src="./imagens/opacity.png" />
              <vs-input size="default" type="number" :value="doubling_time" label="Tempo de duplicação antes do distanciamento social (dias)" />
              <img src="./imagens/distance.png" />
              <vs-input size="default" type="number" :value="relative_contact_rate" label="Distanciamento social (% de redução no contato social)" />
              <img src="./imagens/patient.png" />
              <vs-input size="default" type="number" :value="hosp_rate" label="% De hospitalização (total de infecções)" />
              <img style="margin-top:30px" src="./imagens/alarm.png" />
              <vs-input size="default" type="number" :value="icu_rate" label="% UTI (total de infecções)" />
              <img style="margin-top:30px" src="./imagens/rash.png" />
              <vs-input size="default" type="number" :value="vent_rate" label="% Ventilação (total de infecções)" />
              <img style="margin-top:30px" src="./imagens/hospital.png" />
              <vs-input size="default" type="number" :value="hosp_los" label="Duração da estadia no hospital" />
              <img style="margin-top:30px" src="./imagens/hospital2.png" />
              <vs-input size="default" type="number" :value="icu_los" label="Tempo de permanência na UTI" />
              <img src="./imagens/ventilation.png" />
              <vs-input size="default" type="number" :value="vent_los" label="Duração da estadia do respiradouro" />
              <img src="./imagens/market.png" />
              <vs-input size="default" type="number" :value="Penn_market_share" label="Participação no mercado hospitalar (%)" />
              <img style="margin-top:30px" src="./imagens/overpopulation.png" />
              <vs-input size="default" type="number" :value="S_default" label="População Regional" />
              <img style="margin-top:90px" src="./imagens/placeholder.png" />
              <vs-input size="default" type="number" :value="initial_infections" label="Infecções regionais atualmente conhecidas (usadas apenas para calcular a taxa de detecção - não altera as projeções)" />
            </vs-sidebar>
          </div>
        </b-col>
        <b-col cols="8" class="mt-5 pt-5 ml-3">
          <h1>Modelo de Impacto Hospitalar COVID-19 para Epidemias</h1>
          <p>Um modelo <b>SIR</b> é um modelo epidemiológico que calcula o número teórico de pessoas infectadas com uma doença contagiosa em uma população fechada ao longo do tempo. O nome dessa classe de modelos deriva do fato de envolverem equações acopladas que relacionam o número de pessoas suscetíveis <b><var>S<sub>(t)</sub></var></b>, número de pessoas infectadas <b><var>I<sub>(t)</sub></var></b> e número de pessoas que têm recuperado <b><var>R<sub>(t)</sub></var></b>.</p>
          <p>Essa ferramenta foi desenvolvida pela equipe da Predictive Healthcare na Penn Medicine e a RedFox está apoiando esta causa e disponibilizando gratuitamente o acesso.</p>
          <p><b>Mitigação:</b> Uma redução de <b>0%</b> no contato social após o início do surto reduz o tempo de duplicação para <b>6,0 dias</b>, implicando em uma <var>R<sub>t</sub></var>  do <var>2,71</var>.</p>
          <h4><b><a href="https://mathworld.wolfram.com/SIRModel.html" target="_blank">Modelagem SIR</a> de infecções/recuperação em tempo discreto</b></h4>
          <p><i>O modelo consiste em indivíduos que são Susceptíveis (<var>S</var>),infectado(<var>I</var>) ou recuperado(<var>R</var>).</i></p>
          <p>A epidemia prossegue através de um processo de crescimento e declínio. Este é o modelo central da disseminação de doenças infecciosas e vem sendo utilizado em epidemiologia há muitos anos.</p>
          <p>A dinâmica é dada pelas 3 equações a seguir.</p>
          <h5><var>S<sub>t + 1</sub> = ( - β S<sub>t</sub>I<sub>t</sub>) + S<sub>t</sub></var></h5>
          <h5><var>I<sub>t + 1</sub> = ( β S<sub>t</sub>I<sub>t</sub> - γ I<sub>t</sub>) + I<sub>t</sub></var></h5>
          <h5><var>R<sub>t + 1</sub> = ( γ I<sub>t</sub>) + R<sub>t</sub></var></h5>
          <p>Para projetar o impacto esperado, estimamos os termos do modelo. Para fazer isso, usamos uma combinação de estimativas de outros locais, estimativas informadas com base em raciocínio lógico e melhores sugestões. Parâmetros Os parâmetros do modelo, β e γ, determinam a virulência da epidemia. β pode ser interpretado como a <i>taxa de contato efetiva</i>:</p>
          <h5>β = τ × c</h5>
          <p>que é a transmissibilidade (τ) multiplicado pelo número médio de pessoas expostas (c) A transmissibilidade é a virulência básica do patógeno. O número de pessoas expostas c é o parâmetro que pode ser alterado através do distanciamento social.</p>
          <p>γ é o inverso do tempo médio de recuperação, em dias. Ou seja: se γ = 1 / 14, em seguida, a infecção média irá acabar em 14 dias.</p>
          <p>Um parâmetro descritivo importante é o <i>número básico de reprodução</i> , <var>R<sub>0</sub></var> . Isso representa o número médio de pessoas que serão infectadas por qualquer pessoa infectada. Quando <var>R<sub>0</sub></var> é maior que 1, significa que uma doença crescerá. Superior <var>R<sub>0</sub></var> implica um crescimento mais rápido. É definido como</p>
          <h5><var>R<sub>0</sub></var> = β / γ</h5>
          <p><var>R<sub>0</sub></var> fica maior quando</p>
          <p>
            <ul>
              <li>
                existem mais contatos entre pessoas
              </li>
              <li>
                quando o patógeno é mais virulento
              </li>
              <li>
                quando as pessoas têm o patógeno por longos períodos de tempo
              </li>
            </ul>
          </p>
          <p>
            Um tempo de duplicação de 6 dias e um tempo de recuperação de 14,0 dias implicam uma <var>R<sub>0</sub></var> de 2,71.
          </p>
          <p><b>Efeito do distanciamento social</b></p>
          <p>Após o início do surto, ações para reduzir o contato social reduzirão o parâmetro c . Se isso acontecer no momento t , então o número de pessoas infectadas por qualquer pessoa infectada é <var>R<sub>t</sub></var>, que será menor que <var>R<sub>0</sub></var>.</p>
          <p>Uma redução de 0% no contato social aumentaria o tempo necessário para o surto dobrar, para 6,00 dias a partir de 6,00 dias, com um <var>R<sub>t</sub></var> de 2,71.</p>
          <p><b>Usando o modelo</b></p>
          <p>Precisamos expressar os dois parâmetros β e γ em termos de quantidades que podemos estimar.</p>
          <p><ul>
            <li>γ : o CDC está recomendando 14 dias de auto-quarentena, usaremos\ gama = 1 / 14,0γ=1 / 1 4 . 0.</li>
            <li>Estimar β diretamente, precisaríamos saber a transmissibilidade e as taxas de contato social. como não sabemos essas coisas, podemos extraí-la dostempos de duplicaçãoconhecidos. A AHA diz esperar um tempo duplicado <var>T<sub>d</sub></var> de 7 a 10 dias. Isso significa que uma taxa de crescimento da fase inicial pode ser calculada usando a fórmula do tempo de duplicação:</li>
            </ul></p>
            <h5><var>g = 1 <sup>1 / T <sub>d</sub></sup> - 1</var></h5>
            <p><b-form-input id="range-1"  type="range" min="30" max="200"></b-form-input></p>
        </b-col>
      </b-row>
    </b-container>
    <!-- {{current_hosp}}
    <br />
    {{doubling_time}}
    <br />
    {{relative_contact_rate}}
    <br />
    {{hosp_rate}}
    <br />
    {{icu_rate}}
    <br />
    {{vent_rate}}
    <br />
    {{hosp_los}}
    <br />
    {{icu_los}}
    <br />
    {{vent_los}}
    <br />
    {{Penn_market_share}}
    <br />
    {{S}}
    <br />
    {{initial_infections}}
    <br />
    {{total_infections}}
    <br />
    {{detection_prob}}
    <br />
    {{I}}
    <br />
    {{R}}
    <br />
    {{intrinsic_growth_rate}}
    <br />
    {{recovery_days}}
    <br />
    {{gamma}}
    <br />
    {{beta}}
    <br />
    {{r_t}}
    <br />
    {{r_naught}}
    <br />
    {{doubling_time_t}}
    <br />
    s>>>>>>>>>>>>{{s}}<br>
    i>>>>>>>>>>>>{{i}}<br>
    r>>>>>>>>>>>>{{r}}<br>
    hosp: {{hosp}}<br>
    icu: {{icu}}<br>
    rate: {{vent}}<br>-->
  </div>
</template>

<script>
import DataFrame from "dataframe-js";

export default {
  name: "App",
  components: {
  },
  data() {
    return {
      active:true,
      current_hosp: 4,

      doubling_time: 6,
      relative_contact_rate: 0,
      hosp_rate: 5,
      icu_rate: 2 ,
      vent_rate: 1,
      hosp_los: 7,
      icu_los: 9,
      vent_los: 10,
      Penn_market_share: 15,
      S: 4119405,
      S_default:4119405,
      initial_infections: 91,
      total_infections: null,
      detection_prob: null,
      I: null,
      intrinsic_growth_rate: null,
      gamma: null,
      beta: null,
      r_naught: null,
      n_days: 60,
      beta_decay: 0.0,
      s: [],
      i: [],
      r: [],
      hosp: [],
      icu: [],
      vent: [],
      days: [],
      hosp2: [],
      icu2: [],
      vent2: []
    };
  },
  methods: {
    sir: function(y, beta, gamma, N) {
      this.S = y[0];
      this.I = y[1];
      this.R = y[2];

      let Sn = -beta * this.S * this.I + this.S;
      let In = beta * this.S * this.I - gamma * this.I + this.I;
      let Rn = gamma * this.I + this.R;
      if (Sn < 0) Sn = 0;
      if (In < 0) In = 0;
      if (Rn < 0) Rn = 0;

      let scale = N / (Sn + In + Rn);
      return [Sn * scale, In * scale, Rn * scale];
    },
    sim_sir: function(S, I, R, beta, gamma, n_days, beta_decay = null) {
      let N = S + I + R;
      this.s.push(S);
      this.i = [I];
      this.r = [R];
      for (let day in Array.from(Array(n_days).keys())) {
        console.log(day);
        let y = [this.S, this.I, this.R];
        let result = this.sir(y, beta, gamma, N);
        this.S = result[0];
        this.I = result[1];
        this.R = result[2];
        if (beta_decay) {
          beta = beta * (1 - beta_decay);
        }
        this.s.push(this.S);
        this.i.push(this.I);
        this.r.push(this.R);
      }
      // this.s = [this.s]
      // this.i = [this.i]
      // this.r = [this.r]

      return [this.s, this.i, this.r];
    }
  },
  mounted() {

    this.S = this.S_default;
    this.total_infections =
      this.current_hosp / (this.Penn_market_share/100.0) / (this.hosp_rate/100.0);
    this.detection_prob = this.initial_infections / this.total_infections;
    this.I = this.initial_infections / this.detection_prob;
    this.R = 0;
    this.intrinsic_growth_rate = 2 ** (1 / this.doubling_time) - 1;
    this.recovery_days = 14.0;
    this.gamma = 1 / this.recovery_days;
    this.beta =
      ((this.intrinsic_growth_rate + this.gamma) / this.S) *
      (1 - (this.relative_contact_rate/100.0));
    this.r_t = (this.beta / this.gamma) * this.S;
    this.r_naught = this.r_t / (1 - (this.relative_contact_rate/100.0));
    this.doubling_time_t = 1 / Math.log2(this.beta * this.S - this.gamma + 1);

    let result = this.sim_sir(
      this.S,
      this.I,
      this.R,
      this.beta,
      this.gamma,
      this.n_days,
      this.beta_decay
    );

    this.s = result[0];
    this.i = result[1];
    this.r = result[2];

    for (let j = 0; j < this.i.length; j++) {
      this.hosp.push(this.i[j] * (this.hosp_rate/100.0) * (this.Penn_market_share/100.0));
    }

    this.hosp2.push(this.hosp[0]);
    for (let j = 1; j < this.i.length; j++) {
      this.hosp2.push(this.hosp[j] - this.hosp[j - 1]);
    }

    for (let j = 0; j < this.i.length; j++) {
      this.icu.push(this.i[j] * (this.icu_rate/100.0) * (this.Penn_market_share/100.0));
    }

    this.icu2.push(this.icu[0]);
    for (let j = 0; j < this.i.length; j++) {
      this.icu2.push(this.icu[j] - this.icu[j - 1]);
    }

    for (let j = 0; j < this.i.length; j++) {
      this.vent.push(this.i[j] * (this.vent_rate/100.0) * (this.Penn_market_share/100.0));
    }

    this.vent2.push(this.vent[0]);
    for (let j = 0; j < this.i.length; j++) {
      this.vent2.push(this.vent[j] - this.vent[j - 1]);
    }

    this.days = Array.from(Array(this.n_days + 1).keys());

    let data_list = [this.days, this.hosp, this.icu, this.vent];
    console.log(data_list);

    let data_dict = [];
    for (let i = 0; i < this.hosp.length; i++) {
      data_dict[i] = {
        day: this.days[i],
        hosp: this.hosp[i],
        uci: this.uci[i],
        vent: this.vent[i]
      };
    }

    const df = new DataFrame(data_dict, ["day", "hosp", "uci", "vent"]);

    console.log(df);
    console.log(this.teste);
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Montserrat&display=swap");

#parentx {
  overflow: hidden;
  height: 90vh;
  position: fixed;
  width: 330px;
  margin-top:80px
}
.vs-sidebar--items{
  width: 280px!important;
}

.vs-sidebar--background{
  background: #ffffff10!important;
}

#parentx button {
  border: 1px solid #1c2871 !important;
  background: #ffffff !important;
  color: #1c2871 !important;
  margin-left: 0px;
}

#parentx img {
  float: left;
  margin: 50px 0px 0px 20px;
}
input {
  width: 190px !important;
  float: right;
  margin-bottom: 30px!important;
}
label {
  font-family: Montserrat;
  font-size: 14px !important;
  margin-left: -50px;
}
.vs-con-input-label {
  text-align: initial !important;
  margin-left: 60px;
}
#app {
  font-family: Montserrat, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #ffffff;
  text-align: left;
  color: #2c3e50;
}
#app h1 {
  font-weight: bold;
  font-size: 35px;
  margin: 20px 0px;
}
#app h4{
  font-weight: bold;
  margin:20px 0px
}
#app h5{
  text-align: center;
  line-height: 35px;
}
nav {
  background: #1c2871;
  padding: 20px !important;
  position: fixed!important;
  z-index: 9999;
  width: 100%;
  margin-bottom: 50px!important;
  overflow: hidden;
}
input{
  width: 100%!important;
}
</style>
