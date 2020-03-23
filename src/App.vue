<template>
  <div id="app" v-bind="projection">
    <b-navbar>
      <img src="./imagens/redfox_logo_alta_branco.png" width="150" />
    </b-navbar>
    <b-container fluid>
      <b-row>
        <b-col cols="3" xs="1" style="z-index:10">
          <div ref="parentSidebar" id="parentx">
            <vs-button
              style="margin-left:280px;"
              class="bt_sidebar"
              v-if="active"
              @click="active=!active"
              type="filled"
            >
              <vs-icon icon="chevron_left" />
            </vs-button>
            <vs-button class="bt_sidebar" v-else @click="active=!active" type="filled">
              <vs-icon icon="chevron_right" />
            </vs-button>
            <vs-sidebar default-index="1" color="primary" class="sidebarx" spacer v-model="active">
              <img
                src="./imagens/health.png"
                v-b-tooltip.hover
                title=" o número de pacientes atualmente internados com COVID-19 nos seus hospitais . Esse número é usado em conjunto com a participação no mercado hospitalar e a% de hospitalização para estimar o número total de indivíduos infectados em sua região."
              />
              <vs-input
                size="default"
                type="number"
                v-model="current_hosp"
                label="Pacientes COVID-19 atualmente hospitalizados"
              />
              <img
                src="./imagens/opacity.png"
                v-b-tooltip.hover
                title="esse parâmetro direciona a taxa de novos casos durante as fases iniciais do surto. Atualmente, a American Hospital Association projeta taxas de duplicação entre 7 e 10 dias. Este é o tempo de duplicação esperado em condições de status quo. Para explicar o contato reduzido e outras intervenções de saúde pública, modifique a entrada de distanciamento social ."
              />
              <vs-input
                size="default"
                type="number"
                v-model="doubling_time"
                label="Tempo de duplicação antes do distanciamento social (dias)"
              />
              <img
                src="./imagens/distance.png"
                v-b-tooltip.hover
                title="esse parâmetro permite que os usuários explorem como a redução no contato e na transmissão interpessoal (lavagem das mãos) pode diminuir a taxa de novas infecções. É sua estimativa de quanto redução de contato social está sendo alcançada em sua região em relação ao status quo. Embora não esteja claro quanto uma determinada política pode afetar o contato social (por exemplo, fechamento de escolas ou trabalho remoto), esse parâmetro permite ver como as projeções mudam com reduções percentuais no contato social."
              />
              <vs-input
                size="default"
                type="number"
                v-model="relative_contact_rate"
                label="Distanciamento social (% de redução no contato social)"
              />
              <img
                src="./imagens/patient.png"
                v-b-tooltip.hover
                title="porcentagem de todos os casos infectados que precisarão de hospitalização."
              />
              <vs-input
                size="default"
                type="number"
                v-model="hosp_rate"
                label="% De hospitalização (total de infecções)"
              />
              <img
                style="margin-top:30px"
                src="./imagens/alarm.png"
                v-b-tooltip.hover
                title="porcentagem de todos os casos infectados que precisarão ser tratados em uma UTI."
              />
              <vs-input
                size="default"
                type="number"
                v-model="icu_rate"
                label="% UTI (total de infecções)"
              />
              <img
                style="margin-top:30px"
                src="./imagens/rash.png"
                v-b-tooltip.hover
                title="porcentagem de todos os casos infectados que precisarão de ventilação mecânica."
              />
              <vs-input
                size="default"
                type="number"
                v-model="vent_rate"
                label="% Ventilação (total de infecções)"
              />
              <img
                style="margin-top:30px"
                src="./imagens/hospital.png"
                v-b-tooltip.hover
                title="Número médio de dias de tratamento necessário para pacientes COVID-19 hospitalizados."
              />
              <vs-input
                size="default"
                type="number"
                v-model="hosp_los"
                label="Duração da estadia no hospital"
              />
              <img
                style="margin-top:30px"
                src="./imagens/hospital2.png"
                v-b-tooltip.hover
                title="Número médio de dias de tratamento na UTI necessário para pacientes na UTI COVID-19."
              />
              <vs-input
                size="default"
                type="number"
                v-model="icu_los"
                label="Tempo de permanência na UTI"
              />
              <img
                src="./imagens/ventilation.png"
                v-b-tooltip.hover
                title="número médio de dias de ventilação necessário para pacientes com COVID-19 ventilado."
              />
              <vs-input
                size="default"
                type="number"
                v-model="vent_los"
                label="Duração da estadia do respiradouro"
              />
              <img
                src="./imagens/market.png"
                v-b-tooltip.hover
                title="a proporção de pacientes na região que podem vir ao seu hospital (em oposição a outros hospitais da região) quando ficam doentes. Uma maneira de estimar isso é examinar todos os hospitais da sua região e somar todas as camas. O número de leitos no seu hospital dividido pelo número total de leitos na região vezes 100 dará uma estimativa inicial razoável."
              />
              <vs-input
                size="default"
                type="number"
                v-model="Penn_market_share"
                label="Participação no mercado hospitalar (%)"
              />
              <img
                style="margin-top:30px"
                src="./imagens/overpopulation.png"
                v-b-tooltip.hover
                title="tamanho total da população da região de captação do (s) seu (s) hospital (s)."
              />
              <vs-input
                size="default"
                type="number"
                v-model="S_default"
                label="População Regional"
              />
              <img
                style="margin-top:90px"
                src="./imagens/placeholder.png"
                v-b-tooltip.hover
                title="o número de infecções relatadas na região de captação do seu hospital. Isso é usado apenas para calcular a taxa de detecção - não altera as projeções . Esta entrada é usada para estimar a taxa de detecção de indivíduos infectados."
              />
              <vs-input
                size="default"
                type="number"
                v-model="initial_infections"
                label="Infecções regionais atualmente conhecidas (usadas apenas para calcular a taxa de detecção - não altera as projeções)"
              />
            </vs-sidebar>
          </div>
        </b-col>

        <b-col md="8" class="mt-5 pt-5 ml-3" xs="12">
          <h1>Modelo de Impacto Hospitalar COVID-19 para Epidemias</h1>
          <p>
            Um modelo
            <b>SIR</b> é um modelo epidemiológico que calcula o número teórico de pessoas infectadas com uma doença contagiosa em uma população fechada ao longo do tempo. O nome dessa classe de modelos deriva do fato de envolverem equações acopladas que relacionam o número de pessoas suscetíveis
            <b>
              <var>
                S
                <sub>(t)</sub>
              </var>
            </b>, número de pessoas infectadas
            <b>
              <var>
                I
                <sub>(t)</sub>
              </var>
            </b> e número de pessoas que têm recuperado
            <b>
              <var>
                R
                <sub>(t)</sub>
              </var>
            </b>.
          </p>
          <p>Essa ferramenta foi desenvolvida pela equipe da Predictive Healthcare na Penn Medicine e a RedFox está apoiando esta causa e disponibilizando gratuitamente o acesso.</p>
          <p>
            <b>Mitigação:</b> Uma redução de
            <b>0%</b> no contato social após o início do surto reduz o tempo de duplicação para
            <b>6,0 dias</b>, implicando em uma
            <var>
              R
              <sub>t</sub>
            </var> do
            <var>2,71</var>.
          </p>
          <b-button
            v-b-toggle.collapse-1
            variant="outline-danger"
          >Mostrar mais sobre essa ferramenta</b-button>
          <b-collapse id="collapse-1" class="mt-2">
            <h4>
              <b>
                <a href="https://mathworld.wolfram.com/SIRModel.html" target="_blank">Modelagem SIR</a> de infecções / recuperação em tempo discreto
              </b>
            </h4>
            <p>
              <i>
                O modelo consiste em indivíduos que são Susceptíveis (
                <var>S</var>),infectado(
                <var>I</var>) ou recuperado(
                <var>R</var>).
              </i>
            </p>
            <p>A epidemia prossegue através de um processo de crescimento e declínio. Este é o modelo central da disseminação de doenças infecciosas e vem sendo utilizado em epidemiologia há muitos anos.</p>
            <p>A dinâmica é dada pelas 3 equações a seguir.</p>
            <h5>
              <var>
                S
                <sub>t + 1</sub> = ( - β S
                <sub>t</sub>I
                <sub>t</sub>) + S
                <sub>t</sub>
              </var>
            </h5>
            <h5>
              <var>
                I
                <sub>t + 1</sub> = ( β S
                <sub>t</sub>I
                <sub>t</sub> - γ I
                <sub>t</sub>) + I
                <sub>t</sub>
              </var>
            </h5>
            <h5>
              <var>
                R
                <sub>t + 1</sub> = ( γ I
                <sub>t</sub>) + R
                <sub>t</sub>
              </var>
            </h5>
            <p>Para projetar o impacto esperado, estimamos os termos do modelo. Para fazer isso, usamos uma combinação de estimativas de outros locais, estimativas informadas com base em raciocínio lógico e melhores sugestões.</p>
            <h4>Parâmetros</h4>
            <p>
              Os parâmetros do modelo, β e γ, determinam a virulência da epidemia. β pode ser interpretado como a
              <i>taxa de contato efetiva</i>:
            </p>
            <h5>β = τ × c</h5>
            <p>que é a transmissibilidade (τ) multiplicado pelo número médio de pessoas expostas (c) A transmissibilidade é a virulência básica do patógeno. O número de pessoas expostas c é o parâmetro que pode ser alterado através do distanciamento social.</p>
            <p>γ é o inverso do tempo médio de recuperação, em dias. Ou seja: se γ = 1 / 14, em seguida, a infecção média irá acabar em 14 dias.</p>
            <p>
              Um parâmetro descritivo importante é o
              <i>número básico de reprodução</i> ,
              <var>
                R
                <sub>0</sub>
              </var> . Isso representa o número médio de pessoas que serão infectadas por qualquer pessoa infectada. Quando
              <var>
                R
                <sub>0</sub>
              </var> é maior que 1, significa que uma doença crescerá. Superior
              <var>
                R
                <sub>0</sub>
              </var> implica um crescimento mais rápido. É definido como
            </p>
            <h5>
              <var>
                R
                <sub>0</sub>
              </var> = β / γ
            </h5>
            <p>
              <var>
                R
                <sub>0</sub>
              </var> fica maior quando
            </p>
            <p></p>
            <ul>
              <li>existem mais contatos entre pessoas</li>
              <li>quando o patógeno é mais virulento</li>
              <li>quando as pessoas têm o patógeno por longos períodos de tempo</li>
            </ul>

            <p>
              Um tempo de duplicação de 6 dias e um tempo de recuperação de 14,0 dias implicam uma
              <var>
                R
                <sub>0</sub>
              </var> de 2,71.
            </p>
            <p>
              <b>Efeito do distanciamento social</b>
            </p>
            <p>
              Após o início do surto, ações para reduzir o contato social reduzirão o parâmetro c . Se isso acontecer no momento t , então o número de pessoas infectadas por qualquer pessoa infectada é
              <var>
                R
                <sub>t</sub>
              </var>, que será menor que
              <var>
                R
                <sub>0</sub>
              </var>.
            </p>
            <p>
              Uma redução de 0% no contato social aumentaria o tempo necessário para o surto dobrar, para 6,00 dias a partir de 6,00 dias, com um
              <var>
                R
                <sub>t</sub>
              </var> de 2,71.
            </p>
            <p>
              <b>Usando o modelo</b>
            </p>
            <p>Precisamos expressar os dois parâmetros β e γ em termos de quantidades que podemos estimar.</p>
            <p></p>
            <ul>
              <li>γ : o CDC está recomendando 14 dias de auto-quarentena, usaremos\ gama = 1 / 14,0γ=1 / 1 4 . 0.</li>
              <li>
                Estimar β diretamente, precisaríamos saber a transmissibilidade e as taxas de contato social. como não sabemos essas coisas, podemos extraí-la dostempos de duplicaçãoconhecidos. A AHA diz esperar um tempo duplicado
                <var>
                  T
                  <sub>d</sub>
                </var> de 7 a 10 dias. Isso significa que uma taxa de crescimento da fase inicial pode ser calculada usando a fórmula do tempo de duplicação:
              </li>
            </ul>
            <h5>
              <var>
                g = 1
                <sup>
                  1 / T
                  <sub>d</sub>
                </sup> - 1
              </var>
            </h5>
          </b-collapse>
          <p>
            <label for="range-1" class="ml-2 mt-5">Número de dias para projetar</label>
            <b-form-input id="range-1" type="number" v-model="n_days"></b-form-input>
          </p>
          <h4>Novas Admissões</h4>
          <p>
            Número projetado de admissões
            <b>diárias</b> de COVID-19
          </p>
          <apexchart
            style="max-width:600px;margin: 0px auto;"
            type="line"
            :options="optionsC1"
            :series="seriesC1"
          ></apexchart>
          <h4>Pacientes Admitidos</h4>
          <p>
            <b>Censo</b> projetado de pacientes com COVID-19, responsável por chegadas e altas
          </p>
          <apexchart
            style="max-width:600px;margin: 0px auto;"
            type="line"
            :options="optionsC2"
            :series="seriesC2"
          ></apexchart>
          <b-button v-b-toggle.collapse-2 variant="outline-danger">Mostrar projeções adicionais</b-button>
          <b-collapse id="collapse-2" class="mt-2">
            <h4>Projeções Adicionais</h4>
            <apexchart
              style="max-width:600px;margin: 0px auto;"
              type="line"
              :options="optionsC3"
              :series="seriesC3"
            ></apexchart>
          </b-collapse>

          <h4>Referências e Agradecimentos</h4>
          <ul>
            <li>Webinar da AHA, 26 de fevereiro, James Lawler, MD, professor associado da University of Nebraska Medical Center, O que os líderes da área de saúde precisam saber: Preparação para o COVID-19</li>
            <li>Gostaríamos de reconhecer a valiosa assistência na consulta e revisão das suposições do modelo por Michael Z. Levy, PhD, Professor Associado de Epidemiologia, Departamento de Bioestatística, Epidemiologia e Informática da Escola de Medicina Perelman</li>
          </ul>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      active: true,
      current_hosp: 4,

      doubling_time: 6,
      relative_contact_rate: 0,
      hosp_rate: 7,
      icu_rate: 2,
      vent_rate: 1,
      hosp_los: 7,
      icu_los: 9,
      vent_los: 10,
      Penn_market_share: 15,
      S: 4119405,
      S_default: 4119405,
      initial_infections: 91,
      total_infections: null,
      detection_prob: null,
      I: null,
      intrinsic_growth_rate: null,
      gamma: null,
      beta: null,
      r_naught: null,
      n_days: 70,
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
      vent2: [],
      hosp3: [],
      icu3: [],
      vent3: [],
      optionsC1: {},
      seriesC1: [],
      optionsC2: {},
      seriesC2: [],
      optionsC3: {},
      seriesC3: [],
      i2: [],
      r2: []
    };
  },
  methods: {
    load_projections: function() {
      this.zerar();

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
        this.hosp.push(
          this.i[j] *
            (this.hosp_rate / 100.0) *
            (this.Penn_market_share / 100.0)
        );
      }

      for (let j = 0; j < this.i.length; j++) {
        this.icu.push(
          this.i[j] * (this.icu_rate / 100.0) * (this.Penn_market_share / 100.0)
        );
      }
      for (let j = 0; j < this.i.length; j++) {
        this.vent.push(
          this.i[j] *
            (this.vent_rate / 100.0) *
            (this.Penn_market_share / 100.0)
        );
      }

      for (let j = 1; j < this.n_days; j += this.n_days / 10) {
        if (this.hosp[j] - this.hosp[j - 1] > 0)
          this.hosp2.push(Math.trunc(this.hosp[j] - this.hosp[j - 1]));
        this.days.push(j);
      }

      for (let j = 1; j < this.n_days; j += this.n_days / 10) {
        if (this.icu[j] - this.icu[j - 1] > 0)
          this.icu2.push(Math.trunc(this.icu[j] - this.icu[j - 1]));
      }

      for (let j = 1; j < this.n_days; j += this.n_days / 10) {
        if (this.vent[j] - this.vent[j - 1] > 0)
          this.vent2.push(Math.trunc(this.vent[j] - this.vent[j - 1]));
      }

      //chart admitidos

      for (let i = 1; i <= this.n_days; i += this.n_days / 10) {
        if (this.hosp[i] - this.hosp[i - this.hosp_los] > 0) {
          if (i >= this.hosp_los) {
            this.hosp3.push(
              Math.ceil(this.hosp[i] - this.hosp[i - this.hosp_los])
            );
          } else {
            this.hosp3.push(Math.ceil(this.hosp[i]));
          }
        } else {
          this.hosp3.push(0);
        }
      }

      for (let i = 1; i <= this.n_days; i += this.n_days / 10) {
        if (this.icu[i] - this.icu[i - this.icu_los] > 0) {
          if (i >= this.icu_los) {
            this.icu3.push(Math.ceil(this.icu[i] - this.icu[i - this.icu_los]));
          } else {
            this.icu3.push(Math.ceil(this.icu[i]));
          }
        } else {
          this.icu3.push(0);
        }
      }

      for (let i = 1; i <= this.n_days; i += this.n_days / 10) {
        if (this.vent[i] - this.vent[i - this.vent_los] > 0) {
          if (i >= this.vent_los) {
            this.vent3.push(
              Math.ceil(this.vent[i] - this.vent[i - this.vent_los])
            );
          } else {
            this.vent3.push(Math.ceil(this.vent[i]));
          }
        } else {
          this.vent3.push(0);
        }
      }

      for (let i = 1; i < this.n_days; i += this.n_days / 10) {
        this.i2.push(Math.trunc(this.i[i]));
      }

      for (let i = 1; i < this.n_days; i += this.n_days / 10) {
        this.r2.push(Math.trunc(this.r[i]));
      }

      this.optionsC1 = {
        chart: {
          id: 4
        },
        xaxis: {
          categories: this.days,
          trim: false
        }
      };

      this.seriesC1 = [
        {
          name: "Hospitalizado",
          data: this.hosp2
        },
        {
          name: "UTI",
          data: this.icu2
        },
        {
          name: "Ventilação",
          data: this.vent2
        }
      ];

      this.optionsC2 = {
        chart: {
          id: 4
        },
        xaxis: {
          categories: this.days,
          trim: false
        }
      };

      this.seriesC2 = [
        {
          name: "Hospitalizado",
          data: this.hosp3
        },
        {
          name: "UTI",
          data: this.icu3
        },
        {
          name: "Ventilação",
          data: this.vent3
        }
      ];

      this.optionsC3 = {
        chart: {
          id: 4
        },
        xaxis: {
          categories: this.days,
          trim: false
        }
      };

      this.seriesC3 = [
        {
          name: "Infectado",
          data: this.i2
        },
        {
          name: "Recuperado",
          data: this.r2
        }
      ];
    },
    zerar: function() {
      this.s.length = 0;
      this.i.length = 0;
      this.r.length = 0;
      this.hosp.length = 0;
      this.icu.length = 0;
      this.vent.length = 0;
      this.hosp2.length = 0;
      this.icu2.length = 0;
      this.vent2.length = 0;
      this.hosp3.length = 0;
      this.icu3.length = 0;
      this.vent3.length = 0;
      this.days.length = 0;
      this.S = this.S_default;
      this.i2.length = 0;
      this.r2.length = 0;
      this.total_infections =
        this.current_hosp /
        (this.Penn_market_share / 100.0) /
        (this.hosp_rate / 100.0);
      this.detection_prob = this.initial_infections / this.total_infections;
      this.I = this.initial_infections / this.detection_prob;

      this.R = 0;
      this.intrinsic_growth_rate = 2 ** (1 / this.doubling_time) - 1;
      this.recovery_days = 14.0;
      this.gamma = 1 / this.recovery_days;
      this.beta =
        ((this.intrinsic_growth_rate + this.gamma) / this.S) *
        (1 - this.relative_contact_rate / 100.0);
      this.r_t = (this.beta / this.gamma) * this.S;
      this.r_naught = this.r_t / (1 - this.relative_contact_rate / 100.0);
      this.doubling_time_t = 1 / Math.log2(this.beta * this.S - this.gamma + 1);
    },
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
      this.i.push(I);
      this.r.push(R);
      for (let day in Array.from(Array(200).keys())) {
        
        let y = [this.S, this.I, this.R +day -day];
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

      return [this.s, this.i, this.r];
    }
  },
  computed: {
    projection: function() {
      return this.load_projections();
    }
  },
  watch: {
    n_days: function() {}
  },
  mounted() {
    this.load_projections();
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Montserrat&display=swap");

#parentx {
  overflow: hidden;
  height: 90vh;
  position: fixed;
  margin-top: 80px;
}
.vs-sidebar--items {
  width: 280px !important;
  box-shadow: 1px -1px 20px #9a9595;
}

.vs-sidebar--background {
  background: #ffffff10 !important;
  width: auto !important;
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
  margin-bottom: 30px !important;
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
#app h4 {
  font-weight: bold;
  margin: 20px 0px;
}
#app h5 {
  text-align: center;
  line-height: 35px;
}
nav {
  background: #1c2871;
  padding: 20px !important;
  position: fixed !important;
  z-index: 9999;
  width: 100%;
  margin-bottom: 50px !important;
  overflow: hidden;
}
input {
  width: 100% !important;
}
.apexcharts-canvas {
  text-align: center;
}
</style>
