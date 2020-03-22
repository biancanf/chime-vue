<template>
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
      <img src="../imagens/health.png" />
      <vs-input size="default" type="number" label="Pacientes COVID-19 atualmente hospitalizados" />
      <img src="../imagens/opacity.png" />
      <vs-input size="default" type="number" label="Tempo de duplicação antes do distanciamento social (dias)" />
      <img src="../imagens/distance.png" />
      <vs-input size="default" type="number" label="Distanciamento social (% de redução no contato social)" />
      <img src="../imagens/patient.png" />
      <vs-input size="default" type="number" label="% De hospitalização (total de infecções)" />
      <img style="margin-top:30px" src="../imagens/alarm.png" />
      <vs-input size="default" type="number" label="% UTI (total de infecções)" />
      <img style="margin-top:30px" src="../imagens/rash.png" />
      <vs-input size="default" type="number" label="% Ventilação (total de infecções)" />
      <img style="margin-top:30px" src="../imagens/hospital.png" />
      <vs-input size="default" type="number" label="Duração da estadia no hospital" />
      <img style="margin-top:30px" src="../imagens/hospital2.png" />
      <vs-input size="default" type="number" label="Tempo de permanência na UTI" />
      <img src="../imagens/ventilation.png" />
      <vs-input size="default" type="number" label="Duração da estadia do respiradouro" />
      <img src="../imagens/market.png" />
      <vs-input size="default" type="number" label="Participação no mercado hospitalar (%)" />
      <img style="margin-top:30px" src="../imagens/overpopulation.png" />
      <vs-input size="default" type="number" label="População Regional" />
      <img style="margin-top:90px" src="../imagens/placeholder.png" />
      <vs-input size="default" type="number" label="Infecções regionais atualmente conhecidas (usadas apenas para calcular a taxa de detecção - não altera as projeções)" />
    </vs-sidebar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: false
    };
  }
};
</script>

<style>

</style>