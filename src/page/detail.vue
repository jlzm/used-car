<style scoped>
.title-wrapper,
.header-wrapper,
.detail-vehicle,
.detail-preview,
.flow-navi,
.detail-report {
    margin-top: 50px;
}

.title {
    text-align: center;
}

.switching {
    margin-top: 10px;
}

.switching .chevron {
    margin-top: 10px;
    text-align: center;
    font-size: 4rem;
}

.thumbnail-list {
    overflow: hidden;
    white-space: nowrap;
}

.thumbnail-list > * {
    margin-left: -10px;
}

.thumbnail-list .thumbnail > * {
    margin-left: 10px;
}

.order-panel {
    margin-left: 80px;
}

.well {
    background: #eee;
    padding: 20px;
}

.well > * {
    padding-top: 10px;
}

.well .parting {
    border-bottom: 2px solid #fff;
}

.detail-report .pid {
    padding: 40px;
}

.avatar-thumbnail {
    padding: 20px;
}

.avatar-thumbnail img {
    margin: 0 auto;
}

.short-props table td,
.short-props table th {
    text-align: center;
    border-right: 1px solid #eee;
    padding: 10px;
}

.short-props table td:last-child,
.short-props table th:last-child {
    border-right: 0;
}

.detail-preview .img-wrapper {
    margin-right: -10px;
}

.detail-preview .img-wrapper .card {
    margin: 10px 10px 10px 0;
}

.album .thumbnail-wrapper {
    padding: 10px;
}

.album .thumbnail-wrapper .card {
    padding: 10px;
}

.detail-report-card .desc-table table {
    padding: 10px;
    text-align: center;
    border: 1px solid #eee;
    margin: 0 auto;
}

.btn-group .order {
    background: #fd6c34;
}

.btn-group .bargain {
    background: #22ac38;
}

.btn-group button:hover {
    background: #03a9f4;
}

.detail-report-card .desc-table table tr,
.detail-report-card .desc-table table th,
.detail-report-card .desc-table table td {
    padding: 10px;
    border: 1px solid #eee;
}

.order-panel .detail > * {
    padding-right: 15px;
}
</style>

<template>
    <div>
        <GlobalNav/>
        <SearchBar/>
        <div class="title-wrapper">
            <div class="container">
                <div class="col-lg-8">
                    <div class="y">
                        {{detailList.title}}
                        <span>0过户</span>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="row">
                        <input type="text" class="col-lg-8" placeholder="请输入车型">
                        <button class="col-lg-4">搜索</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="header-wrapper">
            <div class="container">
                <div class="col-lg-6">
                    <div class="row">
                        <div class="slider">
                            <img :src="detailList.preview ? detailList.preview[selectedPreview].url : ''" alt="">
                        </div>
                        <div class="row switching">
                            <div class="col-lg-2 ">
                                <span @click="detailList.preview[selectedPreview--].url" class="row chevron pointer">
                                    <i class="fa fa-chevron-left"></i>
                                </span>
                            </div>
                            <div class="col-lg-8 thumbnail-list">
                                <div class="row">
                                    <div @click="selectedPreview = index" v-for="(item, index) in detailList.preview" :key="index" class="col-lg-4 thumbnail">
                                        <span class="pointer">
                                            <img :src="item.url" alt="item.name">
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-2 ">
                                <span @click="detailList.preview[selectedPreview++].url" class="row chevron pointer">
                                    <i class="fa fa-chevron-right"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 ">
                    <div class=" order-panel ">
                        <h2 class="">{{detailList.title}}</h2>
                        <div class="well">
                            <div>
                                <div class="row">
                                    <div class="col-lg-3">卖家报价</div>
                                    <div class="col-lg-9 detail">
                                        <span class="price currency">￥{{detailList.price}}万</span>
                                        <span class="price currency">新车含税：￥{{detailList.price}}万</span>
                                        <span class="currency"> 降价提醒</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="row">
                                    <div class="col-lg-3">分期买</div>
                                    <div class="col-lg-9 detail">
                                        <span class="price currency">首付：￥2万</span>
                                        <span class="price currency">月供：￥1万 </span>
                                        <span class="currency"> 分期详情</span>
                                    </div>
                                </div>
                            </div>
                            <div class="parting"></div>
                            <div>
                                <div class="row">
                                    <div class="col-lg-3">分期买</div>
                                    <div class="col-lg-9 detail">
                                        <span class="price currency">首付：￥2万</span>
                                        <span class="price currency">月供：￥1万 </span>
                                        <span class="currency"> 分期详情</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="short-props">
                            <table>
                                <thead>
                                    <tr>
                                        <th>2013年10月</th>
                                        <th>9.99万公里</th>
                                        <th>国四</th>
                                        <th>1.2L</th>
                                        <th>陕A</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>上牌时间</td>
                                        <td>公里数</td>
                                        <td>
                                            <a href="#">外迁查询</a>
                                        </td>
                                        <td>排量</td>
                                        <td>上牌城市</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div v-if="!appointed" class="row">
                            <div class="btn-group" v-if="showAppo">
                                <button @click="order" class="col-lg-4 order">预约看车</button>
                                <button class="col-lg-4 bargain">砍价</button>
                                <button class="col-lg-4">免费咨询</button>
                            </div>
                            <form @submit.prevent="submitAppo()" v-else class="col" action="">
                                <div class="input-control">
                                    <label for="">预约时间</label>
                                    <input type="date" v-model="appo.appointed_at">
                                </div>
                                <button type="submit">预约</button>
                                <button @click.stop="showAppo = !showAppo" type="button">取消</button>
                            </form>
                        </div>
                        <div v-else>
                            <button disabled>已预约</button>
                            <p>预约时间：{{appointed.appointed_at}}</p>
                        </div>
                        <div class="row">
                            <div class="col-lg-4">
                                <span>车源号：xa-250936 </span>
                            </div>
                            <div class="col-lg-2">
                                <a href="#">收藏</a>
                            </div>
                            <div class="col-lg-6">
                                <span>发送到手机</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="detail-report">
            <div class="container">
                <div class="title-area">
                    <h2 class="title">车辆检测报告</h2>
                    <div class="row">
                        <div class="col-lg-6">
                            <ReportPanel title="排除重大事故" :modelList="report" :structure="reportStructure" cat="major_accident" />
                        </div>
                        <div class="col-lg-6">
                            <ReportPanel title="泡水火烧检测" :modelList="report" :structure="reportStructure" cat="soaking_and_roasting" />
                        </div>
                    </div>
                </div>
                <div class="row content">
                    <div class="col-lg-3 content-left">
                        <div class="pid">
                            <div class="avatar-thumbnail">
                                <img src="//img1.rrcimg.com/pgstx.png?imageView2/2/interlace/1/w/135/h/135/format/png&v=1" alt="">
                            </div>
                            <div class="staff-star">
                                <div class="mark">99%好评</div>
                            </div>
                            <div class="test-name">Asam</div>
                            <div class="staff-title">架构师</div>
                            <div class="achievement">
                                <div>
                                    <span>检测车辆</span>
                                    <span>1w+</span>
                                </div>
                                <div>
                                    <span>拒绝车辆</span>
                                    <span>9999+</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-9 content-right">
                        <div class="test-desc">检验结果 : 经检测，该车局部钣金、喷漆，前保险杠更换，外观多处有瑕疵，灯光系统正常。内饰整洁，电子系统正常。发动机、变速箱工况正常，怠速规律无抖动，转向灵活。个人一手车。综合车况良好。
                        </div>
                        <div class="row test-main">
                            <div class="col-lg-4"></div>
                            <div class="col-lg-4"></div>
                            <div class="col-lg-4"></div>
                        </div>
                        <div class="row test-other">
                            <div class="col-3"></div>
                            <div class="col-3"></div>
                            <div class="col-3"></div>
                            <div class="col-3"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="detail-vehicle">
            <div class="container">
                <h2 class="title">车辆详情</h2>
                <div class="row">
                    <div class="col-lg-6">
                        <div></div>
                        <div class="desc-text">
                            我的这辆车是2013年10月上牌的，到现在一共行驶了9.99万公里。空间还是不错，钣金比较满意，底盘比较扎实，做生意拉点货非常方便，外观越看越耐看，起码比面包车强的多。这车一直是我自己开，纯个人一手车。开的这几年，平时很注重对车子的养护，车子各方面性能保持的都很好。我开车规矩，车子当然也没有任何毛病，平时对爱车的保养也非常到位。
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <h3>车辆手续信息</h3>
                        <div class="row">
                            <div class="col-lg-6">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>年检到期时间</td>
                                            <td> 2019-10</td>
                                        </tr>
                                        <tr>
                                            <td>商业险到期时间</td>
                                            <td>2018-10</td>
                                        </tr>
                                        <tr>
                                            <td>有无购车发票</td>
                                            <td> 有</td>
                                        </tr>
                                        <tr>
                                            <td>是否4S店保养</td>
                                            <td>否</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="col-lg-6">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>交强险到期时间</td>
                                            <td> 2018-10</td>
                                        </tr>
                                        <tr>
                                            <td>过户次数</td>
                                            <td>0次</td>
                                        </tr>
                                        <tr>
                                            <td>车辆购置税完税证明</td>
                                            <td> 有</td>
                                        </tr>
                                        <tr>
                                            <td>有无改装</td>
                                            <td>否</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="detail-preview">
            <div class="container">
                <h2 class="title">车辆外观</h2>
                <p>车况优秀，性能部件正常使用，经检测，外观及车身结构无重大撞击。</p>
                <div class="row img-wrapper">
                    <div class="col-lg-6">
                        <div class="card">
                            <a class="row car-img">
                                <img src="https://img2.rrcimg.com/o_1cgnk6i7u516811469724876473244971.jpg?imageView/4/w/600/h/400" alt="">
                            </a>
                            <div class="card-desc">外观-右前:车身框架无变形，无重大撞击事故</div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="card">
                            <a class="row car-img">
                                <img src="https://img2.rrcimg.com/o_1cgnk6i7u516811469724876473244971.jpg?imageView/4/w/600/h/400" alt="">
                            </a>
                            <div class="card-desc">外观-右前:车身框架无变形，无重大撞击事故</div>
                        </div>
                    </div>
                </div>
                <div class="album">
                    <div class="row">
                        <div class="col-lg-4">
                            <h3 class="title">车身外观</h3>
                            <div class="row thumbnail-wrapper">
                                <div class="col-lg-6 ">
                                    <div class="card">
                                        <a href="#" class="row car-thumbnails">
                                            <img src="https://img2.rrcimg.com/o_1cgnk6i7u516811469724876473244971.jpg?imageView/4/w/600/h/400" alt="">
                                        </a>
                                    </div>
                                </div>
                                <div class="col-lg-6 ">
                                    <div class="card">
                                        <a href="#" class="row car-thumbnails">
                                            <img src="https://img2.rrcimg.com/o_1cgnk6i7u516811469724876473244971.jpg?imageView/4/w/600/h/400" alt="">
                                        </a>
                                    </div>
                                </div>
                                <div class="col-lg-6 ">
                                    <div class="card">
                                        <a href="#" class="row car-thumbnails">
                                            <img src="https://img2.rrcimg.com/o_1cgnk6i7u516811469724876473244971.jpg?imageView/4/w/600/h/400" alt="">
                                        </a>
                                    </div>
                                </div>
                                <div class="col-lg-6 ">
                                    <div class="card">
                                        <a href="#" class="row car-thumbnails">
                                            <img src="https://img2.rrcimg.com/o_1cgnk6i7u516811469724876473244971.jpg?imageView/4/w/600/h/400" alt="">
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flow-navi">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6">
                        <h3> 五菱汽车-五菱宏光 2010款 1.2L 标准型</h3>
                        <table class="short-props">
                            <tbody>
                                <tr>
                                    <td>2013年10月</td>
                                    <td>9.99万公里</td>
                                    <td>国四</td>
                                    <td>西安</td>
                                    <td>0过户</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="col-lg-6">
                        <div class="row">
                            <div class="col-lg-5">
                                <div>
                                    <span>卖家报价</span>
                                    <span class="price">￥2.20万</span>
                                </div>
                                <div class="">
                                    对车价不满意？
                                </div>
                            </div>
                            <div class="col-lg-7">
                                <div class="row">
                                    <input class="col-lg-8" type="text" placeholder="输入意向价格">
                                    <button class="col-lg-4">砍价</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
</template>



<script>
import api from "../lib/api.js";
import session from "../lib/session.js";
import ReportPanel from "../components/reportPanel.vue";
import SearchBar from "../components/searchBar.vue";
import GlobalNav from "../components/globalNav.vue";
import Footer from "../components/footer";

export default {
    components: {
        SearchBar,
        GlobalNav,
        ReportPanel,
        Footer
    },
    mounted() {
        let id = this.getId();

        this.find(id);
        this.findpReportByVehicle(id);
        this.prepareAppoItem();
        this.hasAppointed();
        this.getReportStructure();
    },
    data() {
        return {
            conf: {},
            appo: {},
            appointed: {},
            detailList: {},
            report: {},
            reportStructure: {},
            selectedPreview: 0,
            appointedAppo: true,
            showAppo: true
        };
    },
    methods: {
        find(id) {
            api("vehicle/find", { id: id }).then(res => {
                this.detailList = res.data;
            });
        },
        getId() {
            return this.$route.params.id;
        },
        order() {
            let item = this.appo;
            if (!item.user_id) {
                alert("请先登入");
                this.$router.push("/login");
                return;
            }
            showAppo = !showAppo;
        },
        submitAppo() {
            let item = this.appo;
            if (!item.user_id) {
                this.appointed = null;
                return;
            }
            api("appo/create", item).then(res => {
                this.hasAppointed();
            });
        },
        prepareAppoItem() {
            this.appo.vehicle_id = this.getId();

            this.appo.user_id = session.uinfo() && session.uinfo().id;
        },
        hasAppointed() {
            let item = this.appo;

            if (!item.user_id) {
                this.appointed = null;
                return;
            }
            let query = `where("vehicle_id" = ${
                item.vehicle_id
            } and "user_id" = ${item.user_id})`;

            api("appo/read", { query }).then(res => {
                this.appointed = res.data[0];
            });
        },
        findpReportByVehicle(vid) {
            api("report/first", {
                where: {
                    vehicle_id: vid
                }
            }).then(res => {
                this.report = res.data;
            });
        },
        getReportStructure() {
            api("MODEL/FIND", { name: "report" }).then(res => {
                this.reportStructure = res.data.structure;
            });
        }
    }
};
</script>


