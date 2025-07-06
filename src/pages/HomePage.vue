<template>
    <section class="home-info">
        <div class="amount-input">
            <label>
                Amount:
                <input type="number" v-model.number="amount" min="0" />
            </label>
        </div>
        <div v-if="coinsOptions.length > 0" class="coins-selectors">
            <div>
                <label>
                    From:
                    <select v-model="baseCoin">
                        <option v-for="coin in coinsOptions" :key="coin.id" :value="coin.id">
                            {{ coin.name }} ({{ coin.symbol }})
                        </option>
                    </select>
                </label>
            </div>

            <div>
                <label>
                    To:
                    <select v-model="quoteCoin">
                        <option v-for="coin in coinsOptions" :key="coin.id" :value="coin.id">
                            {{ coin.name }} ({{ coin.symbol }})
                        </option>
                    </select>
                </label>
            </div>
        </div>

        <button class="convert-btn" @click="convert" :disabled="amount <= 0 || baseCoin === quoteCoin">
            Convert
        </button>
        <!-- <div v-if="!coinResult">Converting...</div> -->
        <div class="result-info" v-if="coinResult">
            <h3>Conversion Result</h3>
            <p>{{ coinResult.amount }} {{ coinResult.base_currency_name }} = {{ coinResult.price }} {{
                coinResult.quote_currency_name }}</p>
        </div>

    </section>

</template>

<script>
import { coinService } from '@/services/coinService';
import { storageService } from '@/services/storage.service';
import coin from '@/store/modules/coin';
// import { userService } from '@/services/userService';

export default {
    data() {
        return {
            coinsOptions: [],
            coinResult: null,
            amount: 1,
            baseCoin: null, // Default to first coin
            quoteCoin: null, // Default to second coin
            loading: false,
            error: null,
        }
    },
    async created() {
        this.$store.commit({ type: 'setCoins' })
        this.coinsOptions = this.$store.getters.coins;
        console.log(this.$store.getters.coins)

        // await coinService.getExchangeRate(10).then(result => {
        //     this.coinResult = result;
        //     storageService.save("Rate", result)
        // })
        //     .catch(error => {
        //         console.error('Failed to fetch BTC value:', error);
        //     })
    },
    methods: {
        convert() {
            const baseCoin = this.baseCoin;
            const quoteCoin = this.quoteCoin;
            const amount = this.amount;

            if (!baseCoin || !quoteCoin || amount <= 0) {
                return;
            }

            coinService.getExchangeRate(amount, baseCoin, quoteCoin)
                .then(result => {
                    this.coinResult = result;
                    storageService.save(`amount:${amount}, from ${baseCoin}, to ${quoteCoin}`, result);
                })
                .catch(error => {
                    console.error('Conversion failed:', error);
                });
        }
    },

}
</script>

<style></style>