<template>
	<el-row class="container">
		<el-col :span="24" class="header">
			<el-col :span="10" class="logo" :class="isCollapse?'logo-collapse-width':'logo-width'">
        <img src="../assets/home.png">
				<!--{{isCollapse?'':sysName}}-->
			</el-col>
			<el-col :span="14" :offset="3" class="menuInfo">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">首页</el-menu-item>
          <el-submenu index="2">
            <template slot="title">开发工具</template>
            <el-menu-item index="2-1">实体生成</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项1</el-menu-item>
              <el-menu-item index="2-4-2">选项2</el-menu-item>
              <el-menu-item index="2-4-3">选项3</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="3" disabled>消息中心</el-menu-item>
          <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
        </el-menu>
			</el-col>
		</el-col>
		<el-col :span="24" class="main">
        <aside><!--
          <el-radio-group v-model="isCollapse" style="margin-bottom: 10px;">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
          </el-radio-group>-->
          <!--导航菜单-->
          <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect"
             unique-opened router :collapse="isCollapse">
            <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden && item.index == initPath">
              <el-submenu :index="index+''" v-if="!item.leaf">
                <template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
                <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
              </el-submenu>
              <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
            </template>
          </el-menu>
        </aside>
        <section class="content-container">
          <div class="grid-content bg-purple-light">
            <el-col :span="24" class="breadcrumb-container">
              <strong class="title">{{$route.name}}</strong>
              <el-breadcrumb separator="/" class="breadcrumb-inner">
                <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                  {{ item.name }}
                </el-breadcrumb-item>
              </el-breadcrumb>
            </el-col>
            <el-col :span="24" class="content-wrapper">
              <transition name="fade" mode="out-in">
                <router-view></router-view>
              </transition>
            </el-col>
          </div>
        </section>
		</el-col>

    <el-col :span="24" class="footer">
      <span class="copyright-text"><span>©2019&nbsp;HuMingfeng&nbsp;&nbsp;&nbsp;</span><a href="https://github.com/humingfeng" target="_blank">GitHub</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://blog.csdn.net/qq_22260641" target="_blank">博客地址</a>&nbsp;</span>
    </el-col>

	</el-row>
</template>

<script>
	export default {
		data() {
			return {
				sysName:'SuperTool',
        initPath:'2-1',
        isCollapse: false,
				sysUserName: '',
				sysUserAvatar: '',
        activeIndex: '1',
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				}
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			handleopen() {
				//console.log('handleopen');
			},
			handleclose() {
				//console.log('handleclose');
			},
			handleselect: function (a, b) {
			},
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
        this.initPath = keyPath[1];
      },
			// //折叠导航栏
			// collapse:function(){
			// 	this.collapsed=!this.collapsed;
			// },
			showMenu(i,status){
				this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
			}
		},
		mounted() {
			var user = sessionStorage.getItem('user');
			if (user) {
				user = JSON.parse(user);
				this.sysUserName = user.name || '';
				this.sysUserAvatar = user.avatar || '';
			}

		}
	}

</script>

<style scoped lang="scss">
	@import '~scss_vars';
	
	.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		.header {
			height: 60px;
      border-color: rgb(230, 230, 230);
      border-right-width: 1px;
      border-right-style: solid;
			//background: $color-primary;
			color:#fff;
			.logo {
				/*width:230px;*/
				height:60px;
				font-size: 22px;
				padding-left:20px;
				padding-right:20px;
				border-color: rgb(230, 230, 230);
				border-right-width: 1px;
				border-right-style: solid;
				img {
          width: 199px;
          float: right;
          margin: 10px 0px 0px 0px;
				}
				.txt {
					color: #1e1310;
				}
			}
      .menuInfo {

      }
			.logo-width{
				width:230px;
        color: blue;
        text-align: center;
			}
			.logo-collapse-width{
				width:60px
			}
			.tools{
				padding: 0px 23px;
				width:14px;
				height: 60px;
				line-height: 60px;
				cursor: pointer;
			}
		}
		.main {
			display: flex;
			// background: #324057;
			position: absolute;
			top: 60px;
			bottom: 0px;
			overflow: hidden;
			aside {
				flex:0 0 230px;
				width: 230px;
				// position: absolute;
				// top: 0px;
				// bottom: 0px;
				.el-menu{
					height: 100%;
				}
				.collapsed{
					width:60px;
					.item{
						position: relative;
					}
					.submenu{
						position:absolute;
						top:0px;
						left:60px;
						z-index:99999;
						height:auto;
						display:none;
					}

				}
			}
			.menu-collapsed{
				flex:0 0 60px;
				width: 60px;
			}
			.menu-expanded{
				flex:0 0 230px;
				width: 230px;
			}
			.content-container {
				// background: #f1f2f7;
				flex:1;
				// position: absolute;
				// right: 0px;
				// top: 0px;
				// bottom: 0px;
				// left: 230px;
				overflow-y: scroll;
				padding: 20px;
				.breadcrumb-container {
					//margin-bottom: 15px;
					.title {
						width: 200px;
						float: left;
						color: #475669;
					}
					.breadcrumb-inner {
						float: right;
					}
				}
				.content-wrapper {
					background-color: #fff;
					box-sizing: border-box;
				}
			}
		}

    .footer {
      width:100%;
      text-align: center;
      position:fixed;
      bottom:0;
      height: 20px;
      padding-left:20px;
      padding-right:20px;
      border-color: rgb(230, 230, 230);
      border-right-width: 1px;
      border-right-style: solid;
      background-color: #409eff;
      color:#fff;
    }
	}
</style>
