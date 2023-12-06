<template>
  <VueApexCharts width="500" type="bar" :options="options" :series="series"></VueApexCharts>
</template>
<script setup>
import { onMounted, ref } from "vue";
import VueApexCharts from "vue3-apexcharts";
import { useItemStore } from "@/stores/items";
import { useItemSellingPriceStore } from "@/stores/itemSellingPrice";
import { IDRCurrency } from "@/utilities/formatter";

const itemStore = useItemStore();
const itemSellingPriceStore = useItemSellingPriceStore();

const options = ref({
  chart: {
    type: "line",
    stacked: false,
  },
  dataLabels: {
    formatter: function (value) {
      return IDRCurrency.format(value);
    },
  },
  yaxis: {
    labels: {
      formatter: function (value) {
        return IDRCurrency.format(value);
      },
    },
  },
  xaxis: {
    categories: itemSellingPriceStore.chart.categories,
  },
});
const series = ref([{ name: "Harga Jual", data: itemSellingPriceStore.chart.seriesData }]);

onMounted(() => {
  itemSellingPriceStore.getData({ id: itemStore.singleResponses.id, currentLimit: 5 });
});
</script>
