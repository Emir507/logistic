<template>
  <div>
    <form>
      <input type="text" v-model="clientInfo.name" placeholder="Ваше имя" />
      <input type="text" v-model="clientInfo.surname" placeholder="Ваша Фамилия" />
      <input type="mail" v-model="clientInfo.email" placeholder="Ваш email" />
      <input type="text" :value="clientInfo.number" @input='change' placeholder="0555050505" />
      <div>
        <input class='calc-form__input' type="number" placeholder="35см" v-model="clientInfo.packageInfo.width">
        <input class='calc-form__input' type="number" placeholder="35см" v-model="clientInfo.packageInfo.height">
        <input class='calc-form__input' type="number" placeholder="35см" v-model="clientInfo.packageInfo.length">
        <p>{{ clientInfo.packageInfo.deliveryPrice }} сомов</p>
        <button @click="calculateDeliveryPrice">Расчитать</button>
      </div>
      <button :disabled="isDisabled" @click="setClient">Оставить заявку</button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      clientInfo: {
        name: '',
        surname: '',
        email: '',
        number: '',
        packageInfo: {
          width: null,
          height: null,
          length: null,
          deliveryPrice: 0
        }
      },
      
    }
  },
  methods: {
    ...mapActions(['addClient']),
    setClient() {
      const { name, surname, email, number } = this.clientInfo;
      this.addClient(this.clientInfo)
      this.formReset()
    },
    change(e) {
      let nums = e.target.value.replace(/[a-b]/g, '')
      this.clientInfo.number = e.target.value
    },
    formReset() {
      this.clientInfo.name = ''
      this.clientInfo.surname = ''
      this.clientInfo.email = ''
      this.clientInfo.number = ''
    },
    calculateDeliveryPrice() {
      const { width, height, length } = this.clientInfo.packageInfo;

      if ( width === null || height === null || length === null) {
        return
      }
      if (Number(width) < 40 || Number(height) < 40 || Number(length) < 40) {
        this.clientInfo.packageInfo.deliveryPrice = 220
        return
      }

      // from centimeters to meters
      let widthToMetre = Number(width) / 100
      let heightToMetre = Number(height) / 100
      let lengthToMetre = Number(length) / 100

      // 1 meter cube
      let oneCube = widthToMetre * heightToMetre * lengthToMetre;

      // 250kg/m3
      let kgInOneCube = 250 * oneCube;

      this.clientInfo.packageInfo.deliveryPrice = Math.round(kgInOneCube * 13);
    }
  },
  computed: {
    ...mapGetters(['getPackageInfo']),
    isDisabled() {
      const { name, surname, email, number } = this.clientInfo;
      const { width, height, length, deliveryPrice } = this.clientInfo.packageInfo;
      let bool =  deliveryPrice === 0 ||
                  width === '' ||
                  height === '' ||
                  length === '' ||
                  name === '' ||
                  surname === '' ||
                  email === '' ||
                  number === '' ? true : false;
      return bool
    }
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
input {
  outline: none;
}
ul {
  list-style-type: none;
  padding: 0;
  li {
    border: 1px solid black;
    padding: 20px;
    width: 60%;
    margin: 0 auto;
    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }
}
p { 
  margin: 0;
}
h3 {
  margin: 0;
}
form {
  display: flex;
  width: 40%;
  flex-direction: column;
  margin: 0 auto;
  background-color: cyan;
  padding: 20px;
  div {
    background-color: #cecece;
    flex-direction: column;
    padding: 20px;
    display: flex;
    margin-bottom: 20px;
    border-radius: 10px;
  }
  input {
    padding: 10px;
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }
  button {
    background-color: orange;
    outline: none;
    border: 1px solid black;
    border-radius: 10px;
  }
}
.error {
  color: red;
  border: 2px red solid;
}
</style>
