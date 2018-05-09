<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-primary">
      <div class="container-fluid">
        <div class="navbar-header col-12">
          <a class="navbar-brand float-left text-white" href="#">My Investments</a>
          <span class="navbar-brand float-left float-sm-right float-md-right float-lg-right text-white">Total Investment / Month: {{$store.getters.getTotalInvestment}}</span>
        </div>
      </div>
    </nav>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 p-4">
          <h4 class="mb-4">Add an Investment</h4>
          <b-form @submit="formSubmit">
            <div class="row">
              <div class="col-12 col-sm-4 col-md-3">
                <b-form-group id="exampleInputGroup2"
                          label="Type"
                          label-for="exampleInput2">
                  <b-form-input id="exampleInput2"
                                type="text"
                                v-model="form.type"
                                placeholder="For ex. Insurance">
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
                    label="Frequency"
                    label-for="exampleInput3">
                  <b-form-select id="exampleInput3"
                                :options="$store.state.frequency"
                                v-model="form.frequency">
                  </b-form-select>
                </b-form-group>
              </div>
              <div class="col-12 col-sm-12 col-md-3 align-self-center add-investment">
                <b-button type="submit" variant="primary">Add Investment</b-button>
              </div>
            </div>
          </b-form>
        </div>
      </div>
      <div class="row">
          <div class="col-12 pl-4 pr-4">
            <div class="row p-2">
              <div v-bind:key="investment.id" v-for="investment in investments" class="col-12 col-sm-6 col-md-4 pl-2 pr-2 mb-3">
                <b-card
                  :title="investment.type"
                  class="">
                  <p class="card-text mb-5">{{ $store.getters.getFrequency(investment.frequency) }} of {{ investment.amount }}</p>
                  <div class="row">
                    <div class="col-12 text-center text-sm-left text-md-left text-xl-left">
                      <b-link @click="$store.commit('removeInvestment', investment.id)" href="#" class="btn btn-primary">Remove this investment</b-link>
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
        form: {
          type: '',
          amount: '',
          frequency: null
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
        this.form.frequency = '';
      },
      formSubmit (e) {
        e.preventDefault();

        const values = Object.assign({}, this.form);
        this.clearForm();
        this.$store.commit('saveInvestment', values) && this.clearForm();
      }
    },
    mounted: function() {
        this.$nextTick(function() {
            this.$store.commit('getInvestments', localStorage.get());
        });
    },
    computed: {
      ...mapState({
        investments: state => state.investments
      }),
       getValue() {
            return `${
                this.$store.getters.getTotalInvestment
            }`;
        }
    }
  }
</script>

<style>
  
  .add-investment {
    margin-top: .9em;
  }
  
  .card-title {
    max-width: 100%;
    display: block;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

</style>
