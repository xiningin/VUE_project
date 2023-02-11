<template>
    <el-affix :offset="0">

        <header
            style="background-color: #fff;-webkit-box-shadow: 0px 3px 8px 0px rgb(224 229 236 / 40%); box-shadow:0px 3px 8px 0px rgb(224 229 236 / 40%); ">
            <div style="height: 64px;padding-left: 20px;padding-right: 20px;">
                <el-row style="width: 100%;" justify="space-between" align="middle">
                    <el-col :span="8">
                        <el-row justify="start" align="middle">
                            <div style="width: 35px;height:35px;"><svg t="1666750360588" class="icon"
                                    viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2615"
                                    width="35" height="35">
                                    <path
                                        d="M689.6 728l-409.6 97.6a129.6 129.6 0 0 1-155.2-94.4L35.2 350.4c-16-68.8 27.2-137.6 94.4-153.6l409.6-97.6c68.8-16 137.6 25.6 155.2 94.4l91.2 379.2c16 68.8-27.2 137.6-96 155.2z"
                                        fill="#E1E1DF" p-id="2616"></path>
                                    <path
                                        d="M772.8 992H259.2c-70.4 0-128-57.6-128-128V256c0-70.4 57.6-128 128-128h513.6c70.4 0 128 57.6 128 128v608c0 70.4-57.6 128-128 128z"
                                        fill="#4E8DF6" p-id="2617"></path>
                                    <path
                                        d="M976 555.2l-35.2-22.4c-14.4-9.6-35.2-4.8-43.2 9.6l-22.4 35.2c-3.2 4.8-1.6 11.2 3.2 14.4l72 43.2c4.8 3.2 11.2 1.6 14.4-3.2l22.4-35.2c9.6-12.8 4.8-33.6-11.2-41.6zM713.6 851.2l70.4 43.2c4.8 3.2 11.2 1.6 16-3.2l142.4-220.8c3.2-4.8 1.6-11.2-3.2-16l-70.4-43.2c-4.8-3.2-11.2-1.6-16 3.2l-142.4 222.4c-4.8 4.8-3.2 11.2 3.2 14.4zM694.4 976l72-48c6.4-4.8 6.4-14.4 0-19.2L704 872c-6.4-3.2-16 0-17.6 8l-11.2 86.4c1.6 8 11.2 16 19.2 9.6z"
                                        fill="#E1E1DF" p-id="2618"></path>
                                    <path
                                        d="M676.8 192H355.2c-25.6 0-48-22.4-48-48V80c0-27.2 22.4-48 48-48h321.6c27.2 0 48 20.8 48 48v64c0 25.6-22.4 48-48 48z"
                                        fill="#2166CC" p-id="2619"></path>
                                    <path
                                        d="M737.6 427.2H534.4c-14.4 0-27.2-11.2-27.2-27.2v-11.2c0-14.4 11.2-27.2 27.2-27.2h203.2c14.4 0 27.2 12.8 27.2 27.2v11.2c0 14.4-12.8 27.2-27.2 27.2zM769.6 608H534.4c-14.4 0-27.2-12.8-27.2-27.2v-11.2c0-14.4 11.2-27.2 27.2-27.2h235.2c14.4 0 27.2 12.8 27.2 27.2v11.2c0 14.4-11.2 27.2-27.2 27.2zM673.6 788.8h-139.2c-14.4 0-27.2-12.8-27.2-27.2v-11.2c0-14.4 11.2-27.2 27.2-27.2h139.2c14.4 0 27.2 12.8 27.2 27.2v11.2c0 14.4-12.8 27.2-27.2 27.2z"
                                        fill="#2166CC" p-id="2620"></path>
                                    <path
                                        d="M396.8 385.6l-88 92.8-25.6-27.2c-11.2-11.2-30.4-11.2-41.6 0-11.2 12.8-11.2 32 0 43.2l44.8 48c4.8 6.4 12.8 9.6 20.8 9.6s16-3.2 20.8-9.6l107.2-113.6c11.2-11.2 12.8-32 1.6-43.2-9.6-11.2-28.8-11.2-40 0z"
                                        fill="#FFFFFF" p-id="2621"></path>
                                </svg></div>
                            <link
                                href='http://cdn.repository.webfont.com/webfonts/nomal/150428/46719/635899f4f629d808e48720a7.css'
                                rel='stylesheet' type='text/css' />
                            <span class="css32b742a92824b9c" style="font-size: 28px;margin-left:10px;">问卷宝</span>
                        </el-row>
                    </el-col>
                    <el-col :span="8" style="padding-top:7px;">
                        <el-row justify="center">
                            <el-menu mode="horizontal" 
								:ellipsis="false"
								:default-active="activeIndex"
								router>
                                <el-menu-item index="/">问卷</el-menu-item>
                                <el-sub-menu index="2">
                                    <template #title>答者</template>
                                    <el-menu-item index="/person">人员管理</el-menu-item>
                                    <el-menu-item index="/overView">数据概览</el-menu-item>
                                    <el-menu-item index="/analysis">真的是问卷分析</el-menu-item>
                                </el-sub-menu>
                                <el-menu-item index="/login">在这儿登录</el-menu-item>
                            </el-menu>
                        </el-row>
                    </el-col>
                    <el-col :span="8" style="padding-top:5px;">
                        <el-row justify="end">
                            <div style="margin-top: 12px;">
                                <el-avatar :size="30"
                                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                            </div>
                            <el-menu mode="horizontal" :ellipsis="false">
                                <el-sub-menu index="2">
                                    <template #title>陈欣</template>
                                    <el-menu-item index="2-1">item one</el-menu-item>
                                    <el-menu-item index="2-2">item two</el-menu-item>
                                    <el-menu-item index="2-3">item three</el-menu-item>
                                    <el-sub-menu index="2-4">
                                        <template #title>item four</template>
                                        <el-menu-item index="2-4-1">item one</el-menu-item>
                                        <el-menu-item index="2-4-2">item two</el-menu-item>
                                        <el-menu-item index="2-4-3">item three</el-menu-item>
                                    </el-sub-menu>
                                </el-sub-menu>
                            </el-menu>
                        </el-row>
                    </el-col>
                </el-row>
            </div>
        </header>
    </el-affix>
</template>

<script>
export default {
    name: 'TopHeader',
    props: {
    },
	data(){
		return {
			activeIndex: '/home'
		}
	}
}
</script>
<style scoped>
.demo-type {
    display: flex;
}

.el-menu--horizontal {
    border-bottom: none !important;
    ;
}

.el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
    outline: 0;
    color: var(--el-menu-hover-text-color);
    background-color: #FFF !important;
    ;
}
</style>