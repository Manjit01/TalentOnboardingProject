﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace talentonboardingproject.Models
{
    public class SalesDTO
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public int ProductId { get; set; }
        public int StoreId { get; set; }
        public DateTime DateSold { get; set; }
        public string CustomerName { get; set; }
        public string ProductName { get; set; }
        public string StoreName { get; set; }
    }
}
