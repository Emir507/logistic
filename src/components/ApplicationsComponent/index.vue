<template>
  <div>
    <h1 class="title">Заявки</h1>
    <h3 v-if="getClients.length === 0" class='title'>Пока нет заявок</h3>
    <ul>
      <li v-for="(client, index) in getClients" :key="index">
        <div class="card">
          <h2 class="title">Информация о клиенте</h2>
          <div class="client-info">
            <div>
              <h3>Имя</h3>
              <p>{{ client.name }}</p>
            </div>
            <div>
              <h3>Фамилия</h3>
              <p>{{ client.surname }}</p>
            </div>
            <div>
              <h3>Email</h3>
              <p>{{ client.email }}</p>
            </div>
            <div>
              <h3>Номер телефона</h3>
              <p>{{ client.number }}</p>
            </div>
          </div>

          <h2 class="title">Информация о посылке</h2>
          <div class="package-info">
            <div>
              <div><h3>Высота</h3> - {{ client.packageDelivery.width }}см</div>
              <div><h3>Ширина</h3> - {{ client.packageDelivery.height }}см</div>
              <div><h3>Длина</h3> - {{ client.packageDelivery.length }}см</div>
            </div>
            <div>
              <h4>Стоимость доставки {{ client.packageDelivery.deliveryPrice }} сом</h4>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters(['getClients'])
  }
}
</script>

<style lang="scss">
.card {
  width: 70%;
  margin: auto;
}
.title {
  text-align: center;
}
.client-info {
  display: flex;
  & div:not(:last-child) {
    margin-right: 20px;
  }
}
.package-info {
  display: flex;
  justify-content: space-between;
  div > div {
    display: flex;
    align-items: center;
  }
}
</style>