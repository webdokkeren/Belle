﻿using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace Umbraco.Belle.Models
{
    /// <summary>
    /// Represents a content property that is displayed in the UI
    /// </summary>
    public class ContentPropertyDisplay : ContentProperty
    {
        [DataMember(Name = "label", IsRequired = true)]
        [Required]
        public string Label { get; set; }

        [DataMember(Name = "alias", IsRequired = true)]
        [Required(AllowEmptyStrings = false)]
        public string Alias { get; set; }

        [DataMember(Name = "description")]
        public string Description { get; set; }

        [DataMember(Name = "view", IsRequired = true)]
        [Required(AllowEmptyStrings = false)]
        public string View { get; set; }

        [DataMember(Name = "config")]
        public string Config { get; set; }

    }
}