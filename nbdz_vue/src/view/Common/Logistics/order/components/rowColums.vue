<template>
  <div>
    <Timeline v-if="data">
      <TimelineItem>
        <p class="time">最后更新时间：{{data.LastUpdateTime}}</p>
        <p class="time">发货时间：{{data.PlatformShipTime}}</p>
        <p class="time">妥投时间：{{data.DeliveredTime}}</p>
        <p class="time">停留天数：{{data.ResidenceTime}}</p>
        <p class="time">运输天数：{{data.TransportationTime}}</p>
        <p v-html="data.LogisticsDetails" class="content"></p>
      </TimelineItem>
    </Timeline>
  </div>
</template>

<script>
export default {
  props: { data: Array },
};
</script>