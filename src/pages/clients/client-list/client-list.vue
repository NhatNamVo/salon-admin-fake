<template>
  <div class="clientList">
      <div class="clientList__wrapper">
          <div class="clientList__header">
              <h1>Clients</h1>
              <div class="add-clients">
                  <el-button @click="handleEdit(scope.row.clientId)">Add Client</el-button>
              </div>
          </div>
          <div class="clientList__table">
            <p>Total <span>{{ totalClient }}</span> client(s) searched</p>
            <el-table class="clientList__table--container" :data="clientList" border>
                <el-table-column label="Registered Date" width="180">
                    <template #default="scope">
                        <span>{{ converRegistrations(scope.row.registrationDate) }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="Client Name" width="180">
                    <template #default="scope">
                        <span>{{ scope.row.clientName }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="Mobile/Phone" width="180">
                    <template #default="scope">
                        <span>{{ scope.row.phoneNumber ?? '' }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="Total Sales" width="180">
                    <template #default="scope">
                        <span>{{ formatMoney(scope.row.totalSalesAmount, 0) }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="Notes" width="180">
                    <template #default="scope">
                        <span>{{ scope.row.notes ?? '' }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="Operations">
                    <template #default="scope">
                        <el-button class="button-edit" size="small" @click="handleEdit(scope.row.clientId)">Edit</el-button>
                        <el-button class="button-sale" size="small" @click="handleEdit(scope.row.clientId)">Sale</el-button>
                        <el-button class="button-calendar" size="small" @click="handleDelete(scope.row.clientId)">Calendar</el-button>
                    </template>
                </el-table-column>
            </el-table>
          </div>
        
      </div>
  </div>
</template>

<script>
import { ElNotification } from "element-plus";
import clientApis from "@/apis/client/clientApis";
import { onMounted, reactive, ref } from "@vue/runtime-core";
import { getServiceUrl } from "@/helpers/utils/api-url-generation";
import {formatMoney} from '@/helpers/utils/format-money/format-money';
import { SERVICE_NAME, SERVICE_TYPE } from "@/helpers/contants/constants";
import { getUserLogged } from "@/helpers/utils/sesstion-storage/session-storage";
import {formatDateFromDateString} from '@/helpers/utils/format-time/format-time';

const openNotification = (status, messages = []) => {
  ElNotification.success({
    title: status,
    message: messages.toString(),
    type: status,
  });
};

export default {
  setup() {
    const pageNumber = ref(1);
    const clientList = ref([]);
    const totalClient = ref(0);
    let messages = reactive([]);

    const getAllUrlApi = getServiceUrl(
      SERVICE_NAME.client.clientList,
      1,
      SERVICE_TYPE.READ,
      "clientRead"
    );

    const { shopBasicInfo } = getUserLogged();
    const { shopId } = shopBasicInfo || "";

    const options = {
      shopId: shopId,
      pageSize: 10,
      pageNumber: pageNumber.value,
    };

    onMounted(() => {
      loadClientList();
      console.log(getAllUrlApi);
    });

    const handleErrorMessages = (errorMessages) => {
      if (errorMessages)
        errorMessages.forEach((message) => messages.push(message.errorMessage));
    };

    const loadClientList = async () => {
      try {
        const response = await clientApis.getAllClient(getAllUrlApi, options);

        if (!response.data.isOK) {
          throw response.data.errorMessages;
        }

        clientList.value = response.data.result.items;
        totalClient.value = response.data.result.pagingInfo.totalItems;
      } catch (error) {
        handleErrorMessages(error);
        openNotification("error", messages);
      } finally {
        console.log("finally");
      }
    };

    const converRegistrations = (date) => {
        return formatDateFromDateString(date);
    };

    return {
      pageNumber,
      clientList,
      totalClient,
      formatMoney,
      converRegistrations
    };
  },
};
</script>

<style lang="scss" scoped>
@import './client-list.scss';
</style>