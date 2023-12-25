import type { Project, Projects } from "~/types";

export default function useProjectsState() {
  // init projects
  const projects = useState<Project[]>("projects", () => []);

  // init pagination
  const pagination = useState("pagination", () => ({
    total: 0,
    current: 1,
    pageSize: 10,
    showQuickJumper: true,
    showSizeChanger: true,
    // showTotal: (total: number) => `Total ${total} items`,
  }));

  // computed charts data

  function setProjects(data: Projects) {
    projects.value = data.projects;
    pagination.value.total = data.totalCount;
  }

  function updateProjects(data: Project) {
    projects.value = projects.value.map((project) =>
      project.projectId === data.projectId ? data : project
    );
  }

  return {
    projects,
    pagination,
    setProjects,
    updateProjects,
  };
}
