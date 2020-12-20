import { ref, computed } from 'vue';

const useSort = (availableItems, sortProperty) => {
  // References
  const sorting = ref(null);

  // Methods
  function sort(mode) {
    sorting.value = mode;
  }

  const displayedUsers = computed(() => {
    if (!sorting.value) {
      return availableItems.value;
    }
    return availableItems.value.slice().sort((u1, u2) => {
      if (sorting.value === 'asc' && u1[sortProperty] > u2[sortProperty]) {
        return 1;
      } else if (sorting.value === 'asc') {
        return -1;
      } else if (
        sorting.value === 'desc' &&
        u1[sortProperty] > u2[sortProperty]
      ) {
        return -1;
      } else {
        return 1;
      }
    });
  });

  return {
    sort,
    displayedUsers,
    sorting,
  };
};
export default useSort;
