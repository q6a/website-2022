# How to modify header, and footer menus?

1. First, open the [Strapi URL](https://sea-turtle-app-33ffu.ondigitalocean.app/admin) and login using **Super Admin** roles.
   ![Strapi login page](assets/q1-1.png)

2. If login successful, then Strapi dashboard page will appear.
   ![Strapi dashboard](assets/q1-2.png)

3. In the side panel menus, click **UI Navigation** menu under plugins group.
   ![UI Navigation](assets/q2-3.png)

4. Then click dropdown on the side of **Manage** button, then choose specific menu parts that you want to modify. See [notes](#notes) for menu parts references.
   ![Menu parts](assets/q2-4.png)

5. Click **New Item**.
   ![New item](assets/q2-5.png)

6. Fill `Title` field with specific title of menu.
   ![Title field](assets/q2-6.png)

7. Set dropdown of `Navigation item type` to `Wrapper element`.
   ![Navigation item type field](assets/q2-7.png)

8. Set toggle `Attach to menu` to `TRUE` to create menu as a link, otherwise set to `FALSE`.
   ![Attach to menu field](assets/q2-8.png)

9. Fill `URL` field. Example: if you create a new custom page with slug name `about`, then fill this field with `page/about`.
   ![URL field](assets/q2-9.png)

10. Click **Save** button at the bottom left of popup to save new item, wait until success notification appear..
    ![Save new item](assets/q2-10.png)

11. Click **Save** button at the top right screen, wait until success notification appear.
    ![Save navigation](assets/q2-11.png)

12. Strapi will send webhooks to Netlify to re-build the code using updated data, this process takes time about 5 minutes less/more.

## Notes

- Below the explanation of menu parts
  ![Menu parts](assets/q2-notes-1.png)
- Menu order can configured by **dragging** icon below
  ![Menu order](assets/q2-notes-2.png)
- Parent with child menu only available on the **Header** menu parts
