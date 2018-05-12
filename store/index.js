import Vuex from 'vuex';
import localStorage from '~/plugins/localStorage';
import uuidv1 from 'uuid/v1'

const store = () => {
  return new Vuex.Store({
    state: {
        investments: [],
        frequency: [
          { text: 'Select One', value: null },
          { text: 'Daily', value: 0.03},
          { text: 'Weekly', value: 0.25},
          { text: 'Fortnightly', value: 0.5},
          { text: 'Monthly', value: 1},
          { text: 'Quarterly', value: 3},
          { text: 'Half Yearly', value: 6},
          { text: 'Yearly', value: 12}
        ]
    },
    mutations: {
        saveInvestment (state, investment) {
            investment.id = uuidv1();
            state.investments = state.investments.concat(investment);

            localStorage.set(state.investments);
        },
        getInvestments (state, investments) {
            state.investments = investments;
        },
        removeInvestment (state, id) {
            state.investments = state.investments.filter(investment => investment.id !== id);
            localStorage.set(state.investments);
        }
    },
    getters: {
      getTotalInvestment: state => {
        const value = state.investments.reduce((acc, payment) => acc + payment.amount / payment.frequency, 0);
        return parseFloat(value).toFixed(2);
      },
      getFrequency: state => value => {
          const frequency = state.frequency.find(p => p.value === value);
          return frequency.text;
      }
    }
  });
};

export default store;
