<template>
    <client-only>
        <table className="table-auto w-full border-collapse border-2 border-slate-500 rounded">
            <thead>
                <tr>
                    <th className="border-2 border-slate-500 p-2 text-left">
                        Organizations Performing Work
                    </th>
                    <th className="border-2 border-slate-500 p-2 text-left">Role</th>
                    <th className="border-2 border-slate-500 p-2 text-left">Type</th>
                    <th className="border-2 border-slate-500 p-2  text-left">Location</th>
                </tr>
            </thead>
            <tbody class="text-sm">
                <tr class="even:bg-white odd:bg-stone-300" v-for="(organization, index) in organizations"
                    :key="organization.organizationId">
                    <td className="border-2 border-slate-500 p-2 text-left truncate">
                        {{ organization.organizationName }}
                    </td>
                    <td className="border-2 border-slate-500 p-2 text-left">
                        {{ index === 0 ? "Lead Organization" : "Supporting Organization" }}
                    </td>
                    <td className="border-2 border-slate-500 p-2 text-left">
                        {{ organization.organizationType }}
                    </td>
                    <td className="border-2 border-slate-500 p-2 text-left">
                        {{
                            organization.city
                            ? `${organization.city}, ${organization.stateTerritory?.name}`
                            : "-"
                        }}
                    </td>
                </tr>
            </tbody>
        </table>
    </client-only>
</template>

<script setup lang="ts">
import type { Organization } from "~/types";

defineProps<{
    organizations: Organization[];
}>();
</script>
