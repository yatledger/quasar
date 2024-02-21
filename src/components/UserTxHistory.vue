<template>
    <table>
        <thead>
            <tr>
                <th>#</th>
                <th>Дата</th>
                <th>От кого</th>
                <th>Куда</th>
                <th>Сумма</th>
                <th>Тип</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="(record, idx) of records" :key="record.id">
                <td>{{ idx + 1 }}</td>
                <td>{{ record.date }}</td>
                <td>{{ record.walletFrom }}</td>
                <td>{{ record.walletTo }}</td>
                <td>{{ record.ammount }}</td>
                <td>{{ record.type }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
  props: {
    records: {
      required: true,
      type: Array
    }
  }
}
</script>
