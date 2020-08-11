<template>
  <div>
    <Timeline v-if="data && data.length>0">
      <TimelineItem v-for="(item,index) in data" :key="index">
        <p class="time">最后更新时间：{{item.LastUpdateTime}}</p>
        <p class="time">发货时间：{{item.PlatformShipTime}}</p>
        <p class="time">妥投时间：{{item.DeliveredTime}}</p>
        <p class="time">停留天数：{{item.ResidenceTime}}</p>
        <p class="time">运输天数：{{item.TransportationTime}}</p>
        <p v-html="item.LogisticsDetails" class="content"></p>
      </TimelineItem>
    </Timeline>
  </div>
</template>

<script>
export default {
  props: { data: Array }
};
</script>