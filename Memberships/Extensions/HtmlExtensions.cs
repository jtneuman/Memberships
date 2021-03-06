﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Memberships.Extensions
{
    public static class HtmlExtensions
    {
        public static MvcHtmlString GlyphLink(this HtmlHelper htmlHelper, string controller, string action,
            string text, string glyphicon, string cssClasses = "", string id = "",
            Dictionary<string, string> attributes = null)
        {
            // declare the span for the glyphicon
            var glyph = String.Format("<span class='glyphicon glyphicon-{0}'></span>", glyphicon);

            //declare the anchor tag
            var anchor = new TagBuilder("a");

            // Add the href attribute to the <a> element
            if (controller.Length > 0)
                anchor.MergeAttribute("href", String.Format("/{0}/{1}/", controller, action));
            else
                anchor.MergeAttribute("href", String.Format("/{0}/{1}/",
                    controller, action));

            // Add the attributes to the <a> element
            if (attributes != null)
                foreach (var attribute in attributes)
                    anchor.MergeAttribute(attribute.Key, attribute.Value);

            // Add the <span> element and the text to the <a> element
            anchor.InnerHtml = String.Format("{0}{1}", glyph, text);
            anchor.AddCssClass(cssClasses);
            anchor.GenerateId(id);

            // Create the helper
            return MvcHtmlString.Create(anchor.ToString(TagRenderMode.Normal));
        }
    }
}