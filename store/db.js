// // store/db.js

// export const state = () => ({
//     leads: []
//   })
  
//   export const mutations = {
//     SET_LEADS(state, leads) {
//       state.leads = leads
//     }
//   }
  
//   export const actions = {
//     async nuxtServerInit ({ commit }, { $axios }) {
//       const leads = await $axios.$get('http://localhost:3000/api/leads')
//       commit('SET_LEADS', leads)
//     }
//   }