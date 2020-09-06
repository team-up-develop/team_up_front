<template>
<div id="app" class="container">
  <nav>
    <ul class="pagination">
      <li class="page-item">
        <a @click="first" class="page-link" href="#">&laquo;</a>
      </li>
      <li class="page-item">
        <a @click="prev" class="page-link" href="#">&lt;</a>
      </li>

      <li
        v-for="i in displayPageRange"
        class="page-item"
        :class="{active: i-1 === currentPage}"
        :key="i"
        >
        <a @click="pageSelect(i)" class="page-link" href="#">{{ i }}</a>
      </li>

      <li class="page-item">
        <a @click="next" class="page-link" href="#">&gt;</a>
      </li>
      <li class="page-item">
        <a @click="last" class="page-link" href="#">&raquo;</a>
      </li>
    </ul>
  </nav>
  <!-- <ul class="list-group">
    <li v-for="item in displayItems" class="list-group-item">
      {{ item.text }}
    </li>
  </ul> -->
</div>
</template>

<script>
export default {
  data() {
    return {
      // langs: ['JavaScript', 'PHP', 'HTML', 'CSS', 'Ruby', 'Python', 'Erlang'],
      // paginate: ['languages']
      items: ['Item One', 'Item Two', 'Item Three', 'Item Four', 'Item Five', 'Item Six', 'Item Seven', 'Item Eight', 'Item Nine', 'Item Ten', 'Item Eleven', 'Item Twelve', 'Item Thirteen'],
      paginate: ['items']
    }
  },
}
</script>

<style lang="css" scoped>
.pagination {
  display: flex;
}
.pagination > li:not(:last-child) {
  margin-right: 10px;
}
.pagination__page {
  display: block;
  width: 30px;
  line-height: 30px;
  text-align: center;
  text-decoration: none;
  border: 1px solid #222;
  color: #222;
}
.pagination__page.is-current {
  background: #0082F5;
  border-color: #0082F5;
  color: #fff;
}
.pagination__nav {
  line-height: 30px;
  text-decoration: none;
  color: #222;
}
</style>

