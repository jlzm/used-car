
<style scoped>
.merchandise {
    text-align: center;
    display: block;
    padding: 5px;
}

.slider,
.query-area,
.vehicle-nav {
    margin-top: 20px;
}

.huge-font {
    color: #ff5722;
    font-size: 5rem;
    font-weight: 900;
    padding-bottom: 15px;
}

.row-padding {
    padding: 15px 25px;
}

.buy-wrapper {
    border-right: 1px solid #eee;
}

.buy-wrapper input {
    border-right: 0;
}

.tag {
    padding-right: 15px;
}

.sell-wrapper input,
.sell-wrapper button,
.sell-wrapper .choice {
    margin-top: 18px;
}

.sell-wrapper input,
.sell-wrapper button {
    width: 100%;
    padding: 15.2px;
}

.buy-wrapper .thumber {
    padding-right: 40px;
}

.sell-wrapper .thumber {
    padding-left: 40px;
}

.vehicle-nav span {
    display: block;
    cursor: pointer;
    text-align: center;
    font-size: 1.2rem;
    padding: 20px;
    color: #000;
    border: 1px solid #eee;
    border-right: 0;
}

.vehicle-nav span:last-child {
    border-right: 1px solid #eee;
}

.vehicle-nav span:hover {
    background: #000;
    color: #fff;
}

.vehicle-nav .more:hover {
    color: #ff5722;
    background: #fff;
}

.row-mrg {
    position: relative;
}

.row-mrg .detail {
    padding: 20px 5px 10px;
}

.row-mrg .title {
    font-size: 1.3rem;
    color: #222;
    padding: 5px 0;
}

.row-mrg .basic {
    font-style: 0.9rem;
    color: #999;
}

.row-mrg .btn-primary {
    position: absolute;
    right: 0;
    bottom: 10px;
    padding: 7px 10px;
    color: #ff5722;
    border: 1px solid #ff5722;
}

.row-mrg .price {
    font-size: 1.2rem;
    color: #ff5722;
}

.row-mrg .btn-primary:hover {
    color: #fff;
    background: #ff5722;
}

.row-mrg img {
    min-height: 192px;
}
</style>

<template>
    <div>
        <GlobalNav/>
        <div class="container">
            <div class="slider">
                <img src="//img1.rrcimg.com/dist/pc/images/sem-banner1-ca39fffb.png" alt="">
            </div>
            <div class="query-area">
                <div class="col-lg-7 buy-wrapper">
                    <div class="col-lg-2">
                        <a href="#" class="merchandise">
                            <router-link to="/searchResult" class="huge-font">买</router-link>
                            <div>1年/2万公里质保</div>
                        </a>
                    </div>
                    <div class="col-lg-10">
                        <div class="row-padding">
                            <router-link :to="'/searchResult?brand_id=' + item.id" v-for="(item, index) in list.brand" :key="index" class="tag">
                                {{item.name}}
                            </router-link>
                        </div>
                        <div class="row-padding">
                            <router-link :to="'/searchResult?model_id=' + item.id" v-for="(item, index) in list.model" :key="index" class="tag">
                                {{item.name}}
                            </router-link>
                        </div>
                    </div>
                </div>
                <div class="col-lg-5 sell-wrapper">
                    <div class="col-lg-4">
                        <a href="#" class="merchandise">
                            <router-link v-if="!unifo" to="login" class="huge-font">卖</router-link>
                            <router-link v-if="unifo" to="publish" class="huge-font">卖</router-link>
                            <div>平均7天售出</div>
                        </a>
                    </div>
                    <div class="col-lg-8">
                        <div class="row-padding">
                            <div>急速卖车</div>
                            <form action="">
                                <input type="nubmer" placeholder="请输入手机号">
                                <button type="submit">帮我卖车</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="vehicle">
                <div class="vehicle-nav">
                    <div class="col-lg-2">
                        <span @click="readCard('onSale')">特价好车</span>
                    </div>
                    <div class="col-lg-2">
                        <span @click="readCard('underFives')">五万以下</span>
                    </div>
                    <div class="col-lg-2">
                        <span @click="readCard('betweenFivesToTen')">五至十万</span>
                    </div>
                    <div class="col-lg-2">
                        <span @click="readCard('betweenTenToTwenty')">十至二十万</span>
                    </div>
                    <div class="col-lg-2">
                        <span @click="readCard('SUV')">SUV</span>
                    </div>
                    <div class="col-lg-2">
                        <span @click="readCard('deadline')">急售车辆</span>
                    </div>
                </div>
                <div class="vehicle-list">
                    <div v-for="(item, index) in cardList" :key="index" class="col-lg-3 ">
                        <div class="row-mrg">
                            <router-link :to="'/detail/' + item.id">
                                <img :src="getVehicleCardList(item)" alt="">
                                <div class="detail">
                                    <div class="title">{{item.title}}</div>
                                    <div class="basic ">2015年02月 / 3.07万公里</div>
                                    <div class="others">
                                        <span class="price">{{item.price}}万</span>
                                        <span class="basic ">首付3.5万</span>
                                    </div>
                                </div>
                            </router-link>
                            <span class="btn-primary cp">免费咨询</span>
                        </div>
                    </div>
                    <div v-if="!cardList" >
                        <h3 style="color:red">
                            暂无车辆
                        </h3>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
</template>




<script>
import api from "../lib/api.js";
import "../css/vehicle-list.css";

import session from "../lib/session.js";

import VehicleCardImg from "../mixins/vehicleCardImg.vue";
import ReaderName from "../mixins/readerName.vue";
import GlobalNav from "../components/globalNav.vue";
import Footer from "../components/footer.vue";

export default {
    components: {
        GlobalNav,
        Footer
    },
    mixins: [VehicleCardImg, ReaderName],
    mounted() {
        this.readName("brand");
        this.readName("model");
        this.findModel("SUV");
        this.readCard("onSale");
    },
    data() {
        return {
            unifo: session.uinfo(),
            list: {},
            cardList: [],
            model: {}
        };
    },

    methods: {
        findModel(name) {
            let modelType = null;
            api("model/read", { name: name }).then(res => {
                res.data.forEach(item => {
                    if (item.name == "SUV") {
                        modelType = item;
                    }
                });
                this.model[name] = modelType;
            });
        },
        readCard(type) {
            let condition = {};

            switch (type) {
                case "onSale":
                    condition = {
                        where: {
                            and: {
                                on_sale: true
                            }
                        }
                    };
                    break;
                case "underFives":
                    condition = {
                        where: {
                            and: [["price", "<", 5]]
                        }
                    };
                    break;
                case "betweenFivesToTen":
                    condition = {
                        where: {
                            and: [["price", ">", 5], ["price", "<", 10]]
                        }
                    };
                    break;
                case "betweenTenToTwenty":
                    condition = {
                        where: {
                            and: [["price", ">", 10], ["price", "<", 20]]
                        }
                    };
                    break;
                case "SUV":
                    condition = {
                        where: {
                            and: {
                                model_id: this.model.SUV.id
                            }
                        }
                    };
                    break;
                case "deadline":
                    let date = new Date();
                    date.setDate(date.getDate() + 3);

                    date = date.toISOString().split("T")[0];
                    console.log("date:", date);
                    condition = {
                        query: `where("deadline" <= "${date}")`
                    };
                    break;
                default:
                    break;
            }

            api("vehicle/read", condition).then(res => {
                this.cardList = res.data;
            });
        }
    }
};
</script>

