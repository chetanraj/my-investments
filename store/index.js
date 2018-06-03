import Vuex from 'vuex';
import localStorage from '~/plugins/localStorage';
import uuidv1 from 'uuid/v1'
import currencies from './currencies'

const store = () => {
  return new Vuex.Store({
    state: {
        payments: [],
        currency: currencies.INR,
        currencies: currencies,
        payfrom: [
            { text: 'Select One', value: null },
            { text: 'ICICI'},
            { text: 'SBI'},
            { text: 'AXIS'},
            { text: 'DBS'},
            { text: 'KBL'}
          ]
    },
    mutations: {
        savePayment (state, payment) {
            payment.id = uuidv1();
            state.payments = state.payments.concat(payment);

            localStorage.set(state.payments);
        },
        getPayments (state, payments) {
            state.payments = payments;
        },
        removePayment (state, id) {
            state.payments = state.payments.filter(payment => payment.id !== id);
            localStorage.set(state.payments);
        },
        changeCurrency(state, newCurrency = currencies.INR) {
            state.currency = newCurrency;
        }
    },
    getters: {
      getTotalPayment: state => {
        const value = state.payments.reduce((acc, payment) => acc + payment.amount / payment.frequency, 0);
        return parseFloat(value).toFixed(2);
      },
      getPayFrom: state => value => {
          const payfrom = state.payfrom.find(p => p.value === value);
          return payfrom.text;
      },
      getCurrency: state => {
          return state.currency.currency;
      }
    }
  });
};

export default store;
