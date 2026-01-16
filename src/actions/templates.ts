"use server";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import type { Mail } from "@/types/Mail";
import { revalidatePath } from "next/cache";

// Get current user session
async function getCurrentUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.user;
}

// Save a new template or update existing
export async function saveTemplate(name: string, content: Mail, templateId?: string) {
  const user = await getCurrentUser();
  if (!user) {
    return { error: "Not authenticated" };
  }

  try {
    if (templateId) {
      // Update existing template - only update content, not name
      await db
        .updateTable("template")
        .set({
          content: JSON.stringify(content),
          updated_at: new Date(),
        })
        .where("id", "=", templateId)
        .where("user_id", "=", user.id)
        .execute();
    } else {
      // Create new template
      await db
        .insertInto("template")
        .values({
          id: crypto.randomUUID(),
          user_id: user.id,
          name,
          content: JSON.stringify(content),
          created_at: new Date(),
          updated_at: new Date(),
        })
        .execute();
    }

    revalidatePath("/templates");
    if (templateId) {
      revalidatePath(`/templates/${templateId}`);
    }
    return { success: true };
  } catch (error) {
    console.error("Failed to save template:", error);
    return { error: "Failed to save template" };
  }
}

// List all templates for current user
export async function listTemplates() {
  const user = await getCurrentUser();
  if (!user) {
    return { error: "Not authenticated", templates: [] };
  }

  try {
    const templates = await db
      .selectFrom("template")
      .select(["id", "name", "created_at", "updated_at"])
      .where("user_id", "=", user.id)
      .orderBy("updated_at", "desc")
      .execute();

    return { templates };
  } catch (error) {
    console.error("Failed to list templates:", error);
    return { error: "Failed to load templates", templates: [] };
  }
}

// Load a single template
export async function loadTemplate(templateId: string) {
  const user = await getCurrentUser();
  if (!user) {
    return { error: "Not authenticated" };
  }

  try {
    const template = await db
      .selectFrom("template")
      .selectAll()
      .where("id", "=", templateId)
      .where("user_id", "=", user.id)
      .executeTakeFirst();

    if (!template) {
      return { error: "Template not found" };
    }

    console.log(template);

    return {
      template: {
        ...template,
        content: template.content as Mail,
      },
    };
  } catch (error) {
    console.error("Failed to load template:", error);
    return { error: "Failed to load template" };
  }
}

// Delete a template
export async function deleteTemplate(templateId: string) {
  const user = await getCurrentUser();
  if (!user) {
    return { error: "Not authenticated" };
  }

  try {
    await db
      .deleteFrom("template")
      .where("id", "=", templateId)
      .where("user_id", "=", user.id)
      .execute();

    revalidatePath("/templates");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete template:", error);
    return { error: "Failed to delete template" };
  }
}
