// state, computed, handler of list change
export default function listChange() {
  const pagination = useState("pagination", () => ({
    total: 0,
    current: 1,
    pageSize: 10,
    showQuickJumper: true,
    showSizeChanger: true,
    // showTotal: (total: number) => `Total ${total} items`,
  }));

  return {
    pagination,
  };
}
