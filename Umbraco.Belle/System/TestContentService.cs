﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Umbraco.Belle.Models;
using Umbraco.Belle.System.PropertyEditors;
using Umbraco.Core.Models;

namespace Umbraco.Belle.System
{
    /// <summary>
    /// Stub data service for testing
    /// </summary>
    internal class TestContentService
    {
        private static readonly IEnumerable<ContentPropertyDto> PropertyRepo = new ContentPropertyDto[]
            {
                new ContentPropertyDto
                    {
                        Alias = "numbers",
                        Id = 10,
                        Label = "Numbers",
                        Description = "Enter a numeric value",
                        DataType = GetDataType(90),
                        Value = "12345987765"
                    },
                new ContentPropertyDto
                    {
                        Alias = "serverEnvironment",
                        Id = 11,
                        Label = "Server Info",
                        Description = "Some server information",
                        DataType = GetDataType(91),
                        Value = ""
                    },
                new ContentPropertyDto
                    {
                        Alias = "complexEditor",
                        Id = 12,
                        Label = "Multiple Values",
                        Description = "A multi value editor",
                        DataType = GetDataType(92),
                        Value = "My Value 1, My Value 2, My Value 3, My Value 4, My Value 5"
                    },
                new ContentPropertyDto
                    {
                        Alias = "postcode",
                        Id = 13,
                        Label = "Postal code",
                        Description = "An Australian postcode",
                        DataType = GetDataType(93),
                        Value = "2034"
                    },
                new ContentPropertyDto
                    {
                        Alias = "moreNumbers",
                        Id = 14,
                        Label = "More Numbers",
                        Description = "Enter a numeric value",
                        DataType = GetDataType(90),
                        Value = "987654321"
                    },
                new ContentPropertyDto
                    {
                        Alias = "fileUpload",
                        Id = 15,
                        Label = "File Upload",
                        Description = "Select a file to upload",
                        DataType = GetDataType(94),
                        Value = "MyFile.jpg"
                    },
            };

        internal static string GetPreValue(int dataTypeId)
        {
            switch (dataTypeId)
            {
                case 90:
                    return "^\\d*$";
                case 93:
                    return "{country: 'Australia'}";
                default:
                    return "";
            }
        }

        internal static IDataTypeDefinition GetDataType(int id)
        {
            var dataTypeRepo = new[]
                {
                    new DataTypeDefinition(-1, new Guid("0BA0F832-D759-4526-9B3E-94BBFC98F92E"))
                        {
                            Name = "Numbers",
                            Id = 90,
                            DatabaseType = DataTypeDatabaseType.Integer
                        },
                    new DataTypeDefinition(-1, new Guid("AD056473-492B-47F8-9613-5A4936666C67"))
                        {
                            Name = "Server Info",
                            Id = 91,
                            DatabaseType = DataTypeDatabaseType.Nvarchar
                        },
                    new DataTypeDefinition(-1, new Guid("A24C4A00-29BF-4A57-BDE6-B1E305A96A4C"))
                        {
                            Name = "Multiple Values",
                            Id = 92,
                            DatabaseType = DataTypeDatabaseType.Nvarchar
                        },
                    new DataTypeDefinition(-1, new Guid("E96E24E5-7124-4FA8-A7D7-C3D3695E100D"))
                        {
                            Name = "Postcode",
                            Id = 93,
                            DatabaseType = DataTypeDatabaseType.Nvarchar
                        },
                     new DataTypeDefinition(-1, new Guid("23A66468-30E2-4537-8039-625F8BC5CA1E"))
                        {
                            Name = "File uploader",
                            Id = 94,
                            DatabaseType = DataTypeDatabaseType.Nvarchar
                        }
                };
            return dataTypeRepo.SingleOrDefault(x => x.Id == id);
        }

        internal static ContentPropertyDisplay GetContentPropertyForDisplay(int id)
        {
            var found = PropertyRepo.SingleOrDefault(x => x.Id == id);
            if (found == null)
            {
                throw new ApplicationException("Could not find property with the specified id " + id);
            }

            //get the property editor
            var propEditor = PropertyEditorResolver.Current.GetById(found.DataType.ControlId);
            if (propEditor == null)
            {
                throw new ApplicationException("Could not find the property editor with the id " + found.DataType.ControlId);
            }

            return new ContentPropertyDto
            {
                Alias = found.Alias,
                Id = found.Id,
                Label = found.Label,
                Description = found.Description,
                Value = found.Value
            }.ForDisplay(GetPreValue(found.DataType.Id), propEditor.ValueEditor.View);
        }

        internal static ContentPropertyDto GetContentProperty(int id)
        {
            var found = PropertyRepo.SingleOrDefault(x => x.Id == id);
            if (found == null)
            {
                throw new ApplicationException("Could not find property with the specified id " + id);
            }
            return found;
        }

        internal static ContentItemDto GetContentItem(int id)
        {
            //we'll only allow 10 items... for testing
            if (id > 10) return null;

            return new ContentItemDto
            {
                Id = id,
                Properties = new List<ContentPropertyDto>
                        {
                            GetContentProperty(10),
                            GetContentProperty(11),
                            GetContentProperty(12),
                            GetContentProperty(13),
                            GetContentProperty(14),
                            GetContentProperty(15)
                        }
            };
        }

        internal static ContentItemDisplay GetContentItemForDisplay(int id)
        {
            //we'll only allow 10 items... for testing
            if (id > 10) return null;

            return new ContentItemDisplay
            {
                Id = id,
                Name = "Test Item " + id,
                Properties = new List<ContentPropertyDisplay>
                        {
                            GetContentPropertyForDisplay(10),
                            GetContentPropertyForDisplay(11),
                            GetContentPropertyForDisplay(12),
                            GetContentPropertyForDisplay(13),
                            GetContentPropertyForDisplay(14),
                            GetContentPropertyForDisplay(15)
                        }
            };
        }

    }
}