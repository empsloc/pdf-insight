import { query } from '@/convex/_generated/server';
import { v } from "convex/values";
import { mutation } from "./_generated/server";

 export const createUser = mutation({
  args: {
    email: v.string(),
    userName: v.string(),
    imageUrl: v.string(),
  },
  handler: async (ctx, args) => {
    //if user already exists
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

      //if not then create new user
      if(user?.length==0){
        await ctx.db.insert('users',{
            email:args.email,
            userName:args.userName,
            imageUrl:args.imageUrl,
            upgrade:false
        })

        return 'inserted new user'
      }
      return "user already exists"
  },
});

export const userUpgradePlan=mutation({
  args:{
    userEmail:v.string()
  },
  handler:async (ctx,args)=>{
    const result = await ctx.db.query('users').filter(q=>q.eq(q.field('email'),args.userEmail)).collect()

    if(result){
      await ctx.db.patch(result[0]._id,{upgrade:true})
      return "sucsess"
    }
    return "error"
  }
})