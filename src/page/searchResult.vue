<style scoped>
.filter-list .prop {
    text-align: center;
    font-size: 1.1rem;
}

.filter-list .filter > * {
    padding: 25px;
    vertical-align: middle;
}

.filter-list .filter > * > * {
    margin-right: 15px;
}

.filter-list .filter .range > * {
    font-size: 1.1rem;
}

.filter-list .filter .sort > * {
    cursor: pointer;
}

.filter-list .filter .sort > *:hover {
    color: #f44336;
}

.price-range {
    display: inline-block;
    width: 180px;
    font-size: 1rem;
}

.price-range input,
.price-range button {
    padding: 2px;
    width: 28%;
    margin: -3px 0;
}

/* .active{
        background: #ccc;
    } */

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
            <div class="row">
                <div class="col-lg-6"></div>
                <div class="col-lg-6 tar">
                    <SearchBar :onSubmit="onSubmit" />
                </div>
            </div>
            <div class="filter-list">
                <div class="row filter">
                    <div class="col-lg-1 prop">
                        <div>品牌</div>
                    </div>
                    <div class="col-lg-10 range sort">
                        <span :class="{'active': !searchParam.brand_id}" @click="removeQuery('brand_id')">不限</span>
                        <span :class="{'active': searchParam.brand_id == item.id}" @click="setQueryWhere('brand_id', item.id)" v-for="(item, index) in list.brand" :key="index">{{item.name}}</span>
                    </div>
                    <div class="col-lg-1 prop">
                        <div class="all-type">全部</div>
                    </div>
                </div>
                <div class="row filter">
                    <div class="col-lg-1 prop">
                        <div>车型</div>
                    </div>
                    <div class="col-lg-10 range sort">
                        <span :class="{'active': !searchParam.model_id}" @click="removeQuery('model_id')">不限</span>
                        <span :class="{'active': searchParam.model_id == item.id}" @click="setQueryWhere('model_id', item.id)" v-for="(item, index) in list.model" :key="index">{{item.name}}</span>
                    </div>
                    <div class="col-lg-1 prop">
                        <div class="all-type">全部</div>
                    </div>
                </div>
                <div class="row filter">
                    <div class="col-lg-1 prop ">
                        <div>价格</div>
                    </div>
                    <div class="col-lg-10 range sort cp-all">
                        <span :class="{'active': !searchParam.priceMin && !searchParam.priceMax}" @click="setQueryPriceRange()">不限</span>
                        <span  :class="{active: searchParam.priceMin == 0 && searchParam.priceMax ==3}" @click="setQueryPriceRange (0,3)">3万以下</span>
                        <span  :class="{active: searchParam.priceMin == 3 && searchParam.priceMax ==5}" @click="setQueryPriceRange (3,5)">3-5万</span>
                        <span  :class="{active: searchParam.priceMin == 5 && searchParam.priceMax ==7}" @click="setQueryPriceRange (5,7)">5-7万</span>
                        <span  :class="{active: searchParam.priceMin == 7 && searchParam.priceMax ==9}" @click="setQueryPriceRange (7,9)">7-9万</span>
                        <span  :class="{active: searchParam.priceMin == 9 && searchParam.priceMax ==16}"@click="setQueryPriceRange (9,16)">9-16万</span>
                        <span  :class="{active: searchParam.priceMin == 16 && searchParam.priceMax ==25}" @click="setQueryPriceRange (16,25)">16-25万</span>
                        <span :class="{active: searchParam.priceMin == 25}" @click="setQueryPriceRange (25,0)">25万以上</span>
                        <div class="price-range">
                            <input type="text" name="" id="">-
                            <input type="text" name="" id="">
                            <span>万</span>
                            <button>确认</button>
                        </div>
                    </div>
                    <div class="col-lg-1 prop">
                        <div class="all-type">全部</div>
                    </div>
                </div>
                <div class="row filter">
                    <div class="col-lg-1 prop">
                        <div>更多</div>
                    </div>
                    <div class="col-lg-10 range">
                        <DropDown :list="list.model" defaultSelect="" />
                    </div>
                    <div class="col-lg-1">
                        <div class="all-type prop">全部</div>
                    </div>
                </div>
                <div class="row filter">
                    <div class="col rang sort">
                        <span >默认排序</span>
                        <span @click="toggleSort('id')" :class="{'active':searchParam.sort_by && searchParam.sort_by[0] == 'id'}">时间
                            <i v-if="searchParam.sort_by && searchParam.sort_by[0] == 'id' && searchParam.sort_by[1] == 'down'" class="fa fa-arrow-down" aria-hidden="true"></i>
                            <i v-else class="fa fa-arrow-up" aria-hidden="true"></i>
                        </span>
                        <span @click="toggleSort('price')" :class="{'active':searchParam.sort_by && searchParam.sort_by[0] == 'price'}">价格
                            <i v-if="searchParam.sort_by && searchParam.sort_by[0] == 'price' && searchParam.sort_by[1] == 'down'" class="fa fa-arrow-down" aria-hidden="true"></i>
                            <i v-else class="fa fa-arrow-up" aria-hidden="true"></i>
                        </span>
                        <!-- <span>里程
                            <i class="fa fa-arrow-down" aria-hidden="true"></i>
                        </span>
                        <span>车龄
                            <i class="fa fa-arrow-down" aria-hidden="true"></i>
                        </span> -->
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="vehicle-list">
                <div v-for="(item, index) in cardList" :key="index" class="col-lg-3 row-mrg">
                    <div class="">
                        <router-link :to="'/detail/' + item.id">
                            <img :src="getVehicleCardList(item)" alt="">
                            <div class="detail">
                                <div class="title">{{item.title}}</div>
                                <div class="basic">2015年02月 / 3.07万公里</div>
                                <div class="others">
                                    <span class="price">{{item.price}}万</span>
                                    <span class="basic">首付3.5万</span>
                                    <a class="btn btn-primary buy">免费咨询</a>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>
                <div v-if="!cardList">暂无数据</div>
            </div>
        </div>
        <Footer/>
    </div>
</template>

<script>
import api from "../lib/api";
import DropDown from "../components/dropDown";
import ReaderName from "../mixins/readerName";
import VehicleCardImg from "../mixins/vehicleCardImg";
import jsonFormat from "../lib/jsonFormat";
import GlobalNav from "../components/globalNav";
import SearchBar from "../components/searchBar";
import Footer from "../components/footer";

export default {
    components: {
        GlobalNav,
        DropDown,
        SearchBar,
        Footer
    },
    mixins: [VehicleCardImg, ReaderName],
    mounted() {
        this.prepareSearchParam();
        this.search();
        this.readName("brand");
        this.readName("model");
    },
    data() {
        return {
            list: {},
            cardList: [],
            searchParam: {}
        };
    },
    methods: {
        removeQuery(type) {
            let query = this.parseRouteQuery();
            delete query[type];

            this.$router.replace({ query });
        },
        setQueryWhere(type, val) {
            let condition = {};

            condition[type] = val;

            let _old = this.searchParam;
            let _new = Object.assign({}, _old, condition);

            this.$router.replace({ query: _new });
        },
        prepareSearchParam() {
            let query = this.parseRouteQuery();
            this.searchParam = query;
        },
        parseRouteQuery() {
            let query = jsonFormat.parse(this.$route.query);
            if (!query.sort_by) query.sort_by = ["id", "down"];
            if (typeof query.sort_by == "string")
                query.sort_by = query.sort_by.split(",");

            return query;
        },
        // 价格筛选
        setQueryPriceRange(min, max) {
            let query = this.parseRouteQuery();
            if (!min && !max) {
                delete query.priceMin;
                delete query.priceMax;
            } else {
                let condition = {
                    priceMin: min,
                    priceMax: max
                };

                query = Object.assign({}, query, condition);
            }

            this.$router.replace({ query });
        },
        onSubmit() {
            this.search();
            console.log("this.$route.query:", this.$route.query);
        },
        toggleSort(property) {
            let query = this.parseRouteQuery();

            let sort_prop = query.sort_by[0];
            let direction = query.sort_by[1];

            if (sort_prop == property) {
                query.sort_by[1] = direction == "up" ? "down" : "up";
            } else {
                query.sort_by[0] = property;
                query.sort_by[1] = "down";
            }

            query.sort_by = query.sort_by.toString();
            this.$router.replace({ query });
        },
        search() {
            let p = this.searchParam;

            let brand_query = "",
                model_query = "",
                price_min_query = "",
                price_max_query = "";
            p.brand_id && (brand_query = `and "brand_id" = ${p.brand_id}`);
            p.model_id && (model_query = `and "model_id" = ${p.model_id}`);
            p.priceMin && (price_min_query = `and "price" >= ${p.priceMin}`);
            p.priceMax && (price_max_query = `and "price" <= ${p.priceMax}`);
            let query = `where("title" contains "${p.keyword ||
                ""}"  ${brand_query} ${model_query} ${price_min_query} ${price_max_query})`;

            api("vehicle/read", { query: query, sort_by: p.sort_by }).then(
                res => {
                    this.cardList = res.data;
                }
            );
        }
    },
    watch: {
        "$route.query": {
            deep: true,
            handler() {
                this.prepareSearchParam();
                this.search();
            }
        }
    }
};
</script>
