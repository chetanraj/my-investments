<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <div class="navbar-header col-12 text-center">
          <a class="navbar-brand" href="#">My Payments</a>
          <div class="currency">
            <b-form-select v-on:change="changeCurrency" :value="getCurrency" :options="$store.state.currencies" class="mb-3" size="sm" />
          </div>
        </div>
      </div>
    </nav>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 p-4">
          <h5 class="mb-4">Add a payment</h5>
          <b-form @submit="formSubmit">
            <div class="row">
              <div class="col-12 col-sm-4 col-md-3">
                <b-form-group id="exampleInputGroup2"
                          label="Type"
                          label-for="exampleInput2">
                  <b-form-input id="exampleInput2"
                                type="text"
                                v-model="form.type"
                                placeholder="For ex. Snacks">
                  </b-form-input>
                </b-form-group>
              </div>
              <div class="col-12 col-sm-4 col-md-3">
                <b-form-group id="exampleInputGroup2"
                          label="Amount"
                          label-for="exampleInput2">
                  <b-form-input id="exampleInput2"
                                type="number"
                                v-model="form.amount"
                                placeholder="For ex. 10000">
                  </b-form-input>
                </b-form-group>
              </div>
              <div class="col-12 col-sm-4 col-md-3">
                <b-form-group id="exampleInputGroup3"
                    label="Pay from"
                    label-for="exampleInput3">
                  <b-form-select id="exampleInput3"
                                :options="$store.state.payfrom"
                                v-model="form.payfrom">
                  </b-form-select>
                </b-form-group>
              </div>
              <div class="col-12 col-sm-12 col-md-3 align-self-center add-payment">
                <b-button type="submit" variant="primary">Add Payment</b-button>
              </div>
            </div>
          </b-form>
        </div>
      </div>
      <div class="row">
          <div class="col-12 pl-4 pr-4">
            <div class="row p-2">
              <div v-bind:key="payment.id" v-for="payment in payments" class="col-12 col-sm-6 col-md-4 pl-2 pr-2 mb-3">
                <b-card
                  :title="payment.type"
                  class="shadow-sm payment">
                  <p class="card-text mb-5">Pay {{$store.state.currency.symbol}}{{ payment.amount }} from {{ $store.getters.getPayFrom(payment.payfrom) }}</p>
                  <div class="row">
                    <div class="col-12 text-center text-sm-left text-md-left text-xl-left">
                      <b-link @click="$store.commit('removePayment', payment.id)" href="#" class="btn btn-primary">Remove this payment</b-link>
                    </div>
                  </div>
                </b-card>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  import localStorage from '~/plugins/localStorage';
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        currency: '',
        form: {
          type: '',
          amount: '',
          payfrom: null
        },
        rules: {
          type: [
              {
                  required: true,
                  message: 'Please input the type',
                  trigger: 'blur'
              }
          ],
        }
      }
    },
    methods: {
      clearForm () {
        this.form.type = '';
        this.form.amount = '';
        this.form.payfrom = '';
      },
      formSubmit (e) {
        e.preventDefault();

        const values = Object.assign({}, this.form);
        this.clearForm();
        this.$store.commit('savePayment', values) && this.clearForm();
      },
      changeCurrency (val) {
        this.$store.commit('changeCurrency', this.$store.state.currencies[val]);
      }
    },
    mounted: function() {
        this.$nextTick(function() {
            this.$store.commit('getPayments', localStorage.get());
        });
    },
    computed: {
      ...mapState({
        payments: state => state.payments
      }),
      getValue() {
          return `${
              this.$store.getters.getTotalPayment
          }`;
      },
      getCurrency () {
        return this.$store.getters.getCurrency
      }
    }
  }
</script>

<style>

  body,
  .custom-select {
    color: #8298AE;
  }

  .navbar-brand, .navbar-brand:hover {
    color: #3c3c3c;
    font-size: x-large;
  }
  .navbar-brand,
  h5 {
    font-weight: 300;
  }

  .navbar {
    border-bottom: 1px solid #CED8E0;
  }

  .add-payment {
    margin-top: .9em;
  }

  .card-title {
    max-width: 100%;
    display: block;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .card.payment:hover {
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, .15) !important;
  }

  .currency {
      position: absolute;
      right: 8px;
      top: 8px;
      width: 65px;
  }

  .currency select {
    height: calc(2.25rem + 2px) !important;
  }

</style>
